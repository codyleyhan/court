import datetime as dt

from court.database import db

thread_users = db.Table('thread_users',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('thread_id', db.Integer, db.ForeignKey('threads.id'), primary_key=True),
)

class Thread(db.Model):
  __tablename__ = 'threads'

  id = db.Column(db.Integer, primary_key=True)
  is_active = db.Column(db.Boolean, default=True)
  users = db.relationship('User', secondary=thread_users, lazy='subquery',
        back_populates='threads')

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)


class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key=True)
  is_active = db.Column(db.Boolean, default=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship("User")
  thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'), nullable=False)
  thread = db.relationship("Thread")

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)