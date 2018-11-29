import datetime as dt
import json

from court.database import db
from court.chats.models import thread_users

class User(db.Model):
  """
  User is the model to map the database to an Object.
  """
  __tablename__ = 'users'

  def __init__(self, id=None, email='', profile=None):
    self.id = id
    self.email = email
    self.profile = profile if not None else Profile(user_id=self.id)

  id = db.Column(db.BigInteger, primary_key=True)
  email = db.Column(db.String(128), unique=True, nullable=False)
  profile = db.relationship('Profile', backref='user', lazy=True, uselist=False)
  threads = db.relationship('Thread', secondary=thread_users,
    back_populates="users")

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

  def _asdict(self):
    return {
      'id': self.id,
      'email': self.email,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

class Profile(db.Model):
  """
  Profile maps a db User row to an Object.
  """
  __tablename__ = 'profiles'

  def __init__(self, user_id=0, first_name='', last_name='', profile_picture=''):
    self.user_id = int(user_id)
    self.first_name = first_name
    self.last_name = last_name
    self.profile_picture = profile_picture

  # TODO(anthonymirand): replace all Profile.id with Profile.user_id (fb_id)
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'), nullable=False)
  first_name = db.Column(db.String(128), nullable=False)
  last_name = db.Column(db.String(128), nullable=False)
  profile_picture = db.Column(db.String(512), default='')

  gender = db.Column(db.String(128), nullable=False, default='')
  preferred_gender = db.Column(db.String(128), nullable=False, default='') # M/F/Both
  color = db.Column(db.String(128), nullable=False, default='')
  animal = db.Column(db.String(128), nullable=False, default='')
  # TODO(anthonymirand): add age/age range/location

  _interests = db.Column(db.String, default='[{}]')
  @property
  def interests(self):
    return json.loads(self._interests)
  @interests.setter
  def interests(self, value):
    self._interests = json.dumps(value)

  _match_history = db.Column(db.String, default='{}')
  @property
  def match_history(self):
    return json.loads(self._match_history)
  @match_history.setter
  def match_history(self, value):
    self._match_history = json.dumps(value)

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

  def _asdict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'first_name': self.first_name,
      'last_name': self.last_name,
      'profile_picture': self.profile_picture,
      'gender': self.gender,
      'preferred_gender': self.preferred_gender,
      'color': self.color,
      'animal': self.animal,
      'interests': self.interests,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
