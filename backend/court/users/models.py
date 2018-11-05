import datetime as dt

from court.database import db
from court.chats.models import thread_users

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.String(128), primary_key=True)
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
  __tablename__ = 'profiles'

  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(128), nullable=False)
  last_name = db.Column(db.String(128), nullable=False)
  profile_picture = db.Column(db.String(512))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # TODO: Add interests to Profile
  _interests = db.Column(db.String) # nullable=False
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
      'first_name': self.first_name,
      'last_name': self.last_name,
      'profile_picture': self.profile_picture,
      'user_id': self.user_id,
      'interests': self.interests,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
