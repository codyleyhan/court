import jwt
import json
from flask import g, request
import requests
from functools import wraps
import datetime as dt

from court.database import db
from court.errors import AuthorizationError, NotFoundError, ValidationError
from court.users.models import User, Profile

class AuthService:
  """
  Handles all business logic for creating and managing user's chat threads.
  """


  def __init__(self, secret, user_store=User, db_conn=db):
    """
    Constructs a new AuthService.

    :param secret: secret key for database initialization
    :type secret: str
    :param user_store: ORM object to create/query users
    :type user_store: court.users.models.User
    :param db_conn: a SQLAlchemy database connection
    :type db_conn: flask_sqlalchemy.SQLAlchemy
    """
    self.secret = secret
    self.user_store = user_store
    self.db = db_conn

  def login(self, access_token):
    """
    Performs Facebook login and information retrieval to create an initial User entry.

    :param access_token: Facebook access token after client-side user authentication
    :type access_token: str

    :return: encrypted user authentication token, and created user object
    """
    if access_token.strip() == '':
      raise ValidationError()

    base_url = 'https://graph.facebook.com/me?fields={}&access_token={}'
    fields = [ 'id', 'first_name', 'last_name', 'email',
               'picture.height(300).width(300)' ]
    r = requests.get(base_url.format(','.join(fields), access_token))
    if r.status_code != 200:
      raise AuthorizationError()

    facebook_user_data = json.loads(r.text)

    user = self.user_store.query.filter(User.id == facebook_user_data['id']).one_or_none()
    exists = True if user is not None else False
    if user is None: # user is new so insert into DB
      user = User()
      user.id = int(facebook_user_data['id'])
      user.email = facebook_user_data['email']
      profile = Profile(int(facebook_user_data['id']),
                        facebook_user_data['first_name'],
                        facebook_user_data['last_name'],
                        facebook_user_data['picture']['data']['url'])
      user.profile = profile
      self.db.session.add(user)
      self.db.session.add(profile)
      self.db.session.commit()

    token_data = {
      'id': int(user.id),
      'is_admin': False
    }

    g.user_id = int(user.id)

    token = jwt.encode(token_data, self.secret, algorithm='HS256')
    profile = self.db.session.query(Profile).filter_by(user_id=facebook_user_data['id']).first()._asdict()

    return token, profile, exists

  def validate_token(self, token):
    """
    Decodes provided encrypted token and sets current context's user to provided user.

    :param token: unique encrypted user authentication token created at User creation
    :type token: str

    :return: None
    :raises: AuthorizationError
    """
    try:
      data = jwt.decode(token, self.secret, algorithms=['HS256'])
      g.user_id = data['id']
    except:
      raise AuthorizationError()

  def get_current_user_id(self):
    """
    Get user id of user in the current context.

    :return: User object of the user in the current context, otherwise return None
    :rtype: str
    """
    if 'user_id' in g:
      return g.user_id

    return None

  def get_current_user(self):
    """
    Get user object of user in the current context.

    :return: User object of the user in the current context, otherwise return None
    :rtype: court.users.models.User
    """
    if 'user' in g:
      return g.user

    user_id = self.get_current_user_id()
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
      return user

    return None

  def get_user_for_user_id(self, user_id):
    """
    Get user object of a user with a specified user_id.
    Used for testing and debugging.

    :return: User object of the user with a specified user_id, otherwise return None
    :rtype: court.users.model.User
    """
    user = self.db.session.query(User).filter_by(id=user_id).first()
    return user

  def get_current_user_profile(self):
    """
    Get profile object of user in the current context.

    :return: Profile object of the user in the current context, otherwise return None
    :rtype: court.users.models.Profile
    """
    user_id = self.get_current_user_id()
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
      profile = self.db.session.query(Profile).filter_by(user_id=user_id).first()
      return profile

    return None

  def update_current_user_profile(self, fields):
    """
    Updates profile object of user in the current context.

    :return: Profile object of the user in the current context, otherwise return None
    :rtype: court.users.models.Profile
    """
    def _update_profile(profile, fields):
      fields['updated_at'] = dt.datetime.utcnow()
      for key, value in fields.items():
        # key not in Profile is a no-op
        if key == 'interests': value = json.dumps(value)
        setattr(profile, key, value)
      self.db.session.commit()

    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
      profile = self.get_current_user_profile()
      if profile is not None:
        _update_profile(profile, fields)
        return profile

    return None

  def login_required(self, f):
    """
    Decorator to add an authorization check around the function, the function
    must be run in an flask application context to work.

    :param f: the function to be wrapped
    :return: a function that now only runs if a user is authorized
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
      if 'user_id' not in g:
        raise AuthorizationError()
      return f(*args, **kwargs)
    return decorated_function



