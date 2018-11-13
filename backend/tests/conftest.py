import pytest

from court.database import db
from court.users.models import User
from court.chats.models import Thread, Message
from court.config import TestingConfig
from court.app import create_app

@pytest.fixture
def app():
  app = create_app(TestingConfig)
  with app.app_context():
    seed_data(db)
  
  yield app

@pytest.fixture
def db_conn(app):
  db.app = app
  with app.app_context():
    seed_data(db)

  yield db

def seed_data(db_conn):
  """
  Seeds the in memory database with some data for tests

  :param db_conn: the db connection
  """
  db_conn.create_all()
  user1 = User('1@ucla.edu')
  user1.id = 1

  user2 = User('2@ucla.edu')
  user2.id = 2

  user3 = User('3@ucla.edu')
  user3.id = 3


  thread = Thread()
  thread.users.append(user1)
  thread.users.append(user2)

  db_conn.session.add(user1)
  db_conn.session.add(user2)
  db_conn.session.add(user3)
  db_conn.session.add(thread)

  message1 = Message(1, 1, 'oldest message')
  message2 = Message(2, 1, 'newest message')
  db_conn.session.add(message1)
  db_conn.session.add(message2)
  db_conn.session.commit()