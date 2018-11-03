import jwt
from flask import g

from court.database import db
from court.errors import ValidationError
from court.users.models import User, Profile


USER_ID_CONTEXT_KEY = 'court:user_id'
USER_CONTEXT_KEY = 'court:user'

class AuthService:
  def __init__(self, secret, user_store=User):
    self.secret = secret
    self.user_store = user_store

  def get_current_user(self):
    if USER_CONTEXT_KEY in g:
      return g.get(USER_CONTEXT_KEY)
    if USER_ID_CONTEXT_KEY in g:
      user_id = g.get(USER_ID_CONTEXT_KEY)
      user = self.user_store.query.get(user_id)
      setattr(g, USER_CONTEXT_KEY, user)
      
      return user
    return None

  def get_current_user_id(self):
    if USER_ID_CONTEXT_KEY in g:
      return g.get(USER_ID_CONTEXT_KEY)
    return None

  def login(self, access_token):
    if access_token.strip() == '':
      raise ValidationError()

    # make requests to facebook graph API to get user info
    user = {
      'id': '123',
      'email': 'test@test.com',
      first_name: 'test',
      last_name: 'ing'
    }

    token_data = {
      'id': user.id,
      'is_admin': False
    }

    setattr(g, USER_ID_CONTEXT_KEY, user.id)

    token = jwt.encode(token_data, self.secret, algorithm='HS256')

    return token

