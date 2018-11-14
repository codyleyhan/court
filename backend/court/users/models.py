import datetime as dt

from court.database import db
from court.chats.models import thread_users

class User(db.Model):
  """
  User is the model to map the database to an Object.
  """
  __tablename__ = 'users'

  # TODO: figure out if we need this constructor
  # def __init__(self, email):
  #   self.email = email

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

  # TODO(anthonymirand): replace all Profile.id with Profile.user_id (fb_id)
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'), nullable=False)
  first_name = db.Column(db.String(128), nullable=False)
  last_name = db.Column(db.String(128), nullable=False)
  profile_picture = db.Column(db.String(512))
  gender = db.Column(db.String(128), nullable=False)
  preferred_gender = db.Column(db.String(128), nullable=False) # M/F/Both
  # TODO(anthonymirand): add age/age range/location

  _interests = db.Column(db.String, nullable=False)
  @property
  def interests(self):
    return json.loads(self._interests)[0]
  @interests.setter
  def interests(self, value):
    self._interests = json.dumps(value)

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
      'interests': self.interests,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
