from flask import g

from court.users.auth_service import AuthService, AuthorizationError
from court.matches.match_service import MatchService
from court.users.models import User, Profile

import pytest

def test_get_current_matches(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret', None, None)
    match_service = MatchService()
    no_matches = match_service.get_current_matches()
    assert no_matches == {}

  with app.app_context():
    auth_service = AuthService('secret', None, None)
    match_service = MatchService()
    no_matches = match_service.get_current_matches()
    assert no_matches is None
