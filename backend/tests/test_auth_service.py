from flask import g

from court.users.auth_service import AuthService, AuthorizationError
from court.users.models import User

import pytest


from .config import app

def test_validate_token():
  valid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzfQ.4OcRLSO_GlqmtdRD_eKLcLiVpSaX8ueIM2ddAOrxY1I'
  bad_signature_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyJ9.Gyndb3IcLowcYksGg20QWouK6DkRQ28Jqlh80tjG9J8'
  with app.app_context():
    service = AuthService('secret', None, None)
    service.validate_token(valid_token)
    assert g.user_id == 123

    with pytest.raises(AuthorizationError):
      service.validate_token(bad_signature_token)

def test_get_current_user_id():
  with app.app_context():
    g.user_id = 'test'
    service = AuthService('secret', None, None)
    id = service.get_current_user_id()
    assert id == 'test'

  with app.app_context():
    service = AuthService('secret', None, None)
    id = service.get_current_user_id()
    id is None

def test_login_required():
  with app.app_context():
    g.user_id = 'test'
    service = AuthService('secret', None, None)
    f = service.login_required(lambda x: x)
    value = f(1)
    value == 1
  with app.app_context():
    service = AuthService('secret', None, None)
    f = service.login_required(lambda x: x)
    with pytest.raises(AuthorizationError):
      f(1)