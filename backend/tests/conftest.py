import pytest
import json

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
    db.drop_all()

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
  user1_profile.interests = json.dumps({'interest1':'value1'})
  user1_profile.match_history = {
    '2': {
      'active': True,
      'percent_unlocked': 0,
      'profile': {
        'animal': '',
        'color': '',
        'gender': '',
        'preferred_gender': '',
        'first_name': '',
        'last_name': '',
        'profile_picture': '',
        'interests': {}
      }
    }
  }
  user1.profile = user1_profile

  user2 = User()
  user2.id = 2
  user2.email = '2@ucla.edu'
  user2_profile = Profile()
  user2_profile.first_name = 'Josephine'
  user2_profile.last_name = 'Bruin'
  user2_profile.gender = 'Female'
  user2_profile.preferred_gender = 'Male'
  user2_profile.interests = json.dumps({'interest2':'value2'})
  user2_profile.match_history = {
    '1': {
      'active': True,
      'percent_unlocked': 0,
      'profile': {
        'animal': '',
        'color': '',
        'gender': '',
        'preferred_gender': '',
        'first_name': '',
        'last_name': '',
        'profile_picture': '',
        'interests': {}
      }
    }
  }
  user2.profile = user2_profile

  user3 = User()
  user3.id = 3
  user3.email = '3@ucla.edu'
  user3_profile = Profile()
  user3_profile.first_name = 'Josephine'
  user3_profile.last_name = 'Bruin'
  user3_profile.gender = 'Female'
  user3_profile.preferred_gender = 'Male'
  user3_profile.interests = json.dumps({'interest3':'value3'})
  user3.profile = user3_profile

  user4 = User()
  user4.id = 4
  user4.email = '4@ucla.edu'
  user4_profile = Profile()
  user4_profile.first_name = 'Joe'
  user4_profile.last_name = 'Bruin'
  user4_profile.gender = 'Male'
  user4_profile.preferred_gender = 'Female'
  user4_profile.interests = json.dumps({'interest3':'value3'})
  user4.profile = user4_profile


  thread = Thread()
  thread.users.append(user1)
  thread.users.append(user2)

  db_conn.session.add(user1)
  db_conn.session.add(user2)
  db_conn.session.add(user3)
  db_conn.session.add(user4)
  db_conn.session.add(thread)

  message1 = Message(1, 1, 'oldest message')
  message2 = Message(2, 1, 'newest message')
  db_conn.session.add(message1)
  db_conn.session.add(message2)
  db_conn.session.commit()
