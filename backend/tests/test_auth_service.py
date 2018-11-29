from flask import g

from court.users.auth_service import AuthService, AuthorizationError
from court.users.models import User, Profile

import pytest

def test_validate_token(app):
  valid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzfQ.4OcRLSO_GlqmtdRD_eKLcLiVpSaX8ueIM2ddAOrxY1I'
  bad_signature_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.Gyndb3IcLowcYksGg20QWouK6DkRQ28Jqlh80tjG9J8'
  with app.app_context():
    service = AuthService('secret', None, None)
    service.validate_token(valid_token)
    assert g.user_id == 123

    with pytest.raises(AuthorizationError):
      service.validate_token(bad_signature_token)

def test_get_current_user_id(app):
  with app.app_context():
    g.user_id = 'test'
    service = AuthService('secret', None, None)
    id = service.get_current_user_id()
    assert id == 'test'

  with app.app_context():
    service = AuthService('secret', None, None)
    id = service.get_current_user_id()
    assert id is None

def test_get_current_user(app):
  with app.app_context():
    g.user_id = '1'
    service = AuthService('secret')
    user = service.get_current_user()._asdict()
    # Ignore created/updated time
    user['created_at'], user['updated_at'] = 0, 0

    mocked_user = {
      'id': 1,
      'email': '1@ucla.edu',
      'created_at': 0,
      'updated_at': 0
    }

    assert user == mocked_user

  with app.app_context():
    service = AuthService('secret')
    user = service.get_current_user()
    assert user is None

def test_get_current_user_profile(app):
  with app.app_context():
    g.user_id = '1'
    service = AuthService('secret')
    profile = service.get_current_user_profile()._asdict()
    # Ignore created/updated time
    profile['created_at'], profile['updated_at'] = 0, 0

    # Profile._asdict() does not return match_history
    mocked_profile = {
      'id': 1,
      'user_id': 1,
      'first_name': 'Joe',
      'last_name': 'Bruin',
      'profile_picture': '',
      'gender': 'Male',
      'preferred_gender': 'Female',
      'color': '',
      'animal': '',
      'interests': [{'interest1': 'value1'}],
      'created_at': 0,
      'updated_at': 0
    }

    assert profile == mocked_profile

  with app.app_context():
    service = AuthService('secret')
    profile = service.get_current_user()
    assert profile is None

def test_update_current_user_profile(app):
  mocked_profile = {
    'id': 1,
    'user_id': 1,
    'first_name': 'Tim',
    'last_name': 'Bruin',
    'profile_picture': '',
    'gender': 'Male',
    'preferred_gender': 'Female',
    'color': '',
    'animal': '',
    'interests': [{'interest1': 'value1'}, {'interest2': 'value2'}],
    'created_at': 0,
    'updated_at': 0
  }

  with app.app_context():
    g.user_id = '1'
    service = AuthService('secret')
    old_profile = service.get_current_user_profile()._asdict()

    fields = {'first_name' : 'Tim',
              'interests': [{'interest1': 'value1'}, {'interest2': 'value2'}]}
    new_profile = service.update_current_user_profile(fields)._asdict()

    assert new_profile is not old_profile and \
           new_profile['updated_at'] > old_profile['updated_at']
    # Ignore created/updated time
    new_profile['created_at'], new_profile['updated_at'] = 0, 0
    assert new_profile == mocked_profile

  with app.app_context():
    service = AuthService('secret')
    old_profile = service.get_current_user_profile()
    assert old_profile is None

  with app.app_context():
    g.user_id = '1'
    service = AuthService('secret')
    old_profile = service.get_current_user_profile()._asdict()

    fields = {'thisisnotavalidkey' : 'thisisnotavalidvalue',
              'first_name': 'Tim',
              'interests': [{'interest1': 'value1'}, {'interest2': 'value2'}]}
    new_profile = service.update_current_user_profile(fields)._asdict()

    assert new_profile is not old_profile and \
           new_profile['updated_at'] > old_profile['updated_at']
    # Ignore created/updated time
    new_profile['created_at'], new_profile['updated_at'] = 0, 0
    assert new_profile == mocked_profile

def test_login_required(app):
  with app.app_context():
    g.user_id = 'test'
    service = AuthService('secret', None, None)
    f = service.login_required(lambda x: x)
    value = f(1)
    assert value == 1
  with app.app_context():
    service = AuthService('secret', None, None)
    f = service.login_required(lambda x: x)
    with pytest.raises(AuthorizationError):
      f(1)
