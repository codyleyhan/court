import datetime as dt

from court.database import db
from court.chats.models import thread_users

class User(db.Model):
  __tablename__ = 'users'
  
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(128), unique=True, nullable=False)
  threads = db.relationship("Thread", secondary=thread_users, 
    back_populates="users")

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)