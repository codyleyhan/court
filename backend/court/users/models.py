import datetime as dt

from court.database import db
from court.chats.models import thread_users

class User(db.Model):
  __tablename__ = 'users'
  
  id = db.Column(db.String(128), primary_key=True)
  email = db.Column(db.String(128), unique=True, nullable=False)
  profile = db.relationship('Profile', backref='user', lazy=True, uselist=False)
  threads = db.relationship("Thread", secondary=thread_users, 
    back_populates="users")

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

class Profile(db.Model):
  __tablename__ = 'profiles'
  
  id = db.Column(db.Integer, primary_key=True)
  first_name = db.Column(db.String(128), nullable=False)
  last_name = db.Column(db.String(128), nullable=False)
  profile_picture = db.Column(db.String(512))
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)