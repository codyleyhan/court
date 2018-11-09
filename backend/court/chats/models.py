import datetime as dt

from court.database import db

"""
thread_users is the table that represents the many to many relationship between
threads and users.
"""
thread_users = db.Table('thread_users',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('thread_id', db.Integer, db.ForeignKey('threads.id'), primary_key=True),
)

class Thread(db.Model):
  """
  Thread is the model to map the database to an object.
  """
  __tablename__ = 'threads'

  id = db.Column(db.Integer, primary_key=True)
  is_active = db.Column(db.Boolean, default=True)
  users = db.relationship('User', secondary=thread_users, lazy='subquery',
        back_populates='threads')
  messages = db.relationship('Message', backref='thread', lazy=True)

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

  def __repr__(self):
    return '<Thread %d %r %d>' % (self.id, self.is_active, self.updated_at)

  def _asdict(self):
    return {
      'id': self.id,
      'is_active': self.is_active,
      'users': self.users,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }


class Message(db.Model):
  """
  Message maps a db message row to an Object
  """
  __tablename__ = 'messages'

  def __init__(self, user_id, thread_id, body):
    self.user_id = user_id
    self.thread_id = thread_id
    self.body = body

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  user = db.relationship('User')
  thread_id = db.Column(db.Integer, db.ForeignKey('threads.id'), nullable=False)
  body = db.Column(db.Text, nullable=False)

  created_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=dt.datetime.utcnow)

  def __repr__(self):
    return '<Message %r %r %r %r>' % (self.id, self.user_id, self.thread_id, self.updated_at)
  
  def _asdict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'thread_id': self.thread_id,
      'body': self.body,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
