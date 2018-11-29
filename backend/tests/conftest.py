import pytest

from court.database import db
from court.users.models import User, Profile
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


  user1 = User()
  user1.id = 1
  user1.email = '1@ucla.edu'
  user1_profile = Profile()
  user1_profile.first_name = 'Joe'
  user1_profile.last_name = 'Bruin'
  user1_profile.gender = 'Male'
  user1_profile.preferred_gender = 'Female'
  user1_profile.interests = [{'interest1':'value1'}]
  user1.profile = user1_profile

  user2 = User()
  user2.id = 2
  user2.email = '2@ucla.edu'

  user3 = User()
  user3.id = 3
  user3.email = '3@ucla.edu'


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
