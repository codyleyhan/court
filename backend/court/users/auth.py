import jwt

from court.database import db
from court.errors import ValidationError
from court.users.models import User, Profile

class AuthService():
  def __init__(self, passed_db):
    self.db = db
    if passed_db is not None:
      self.db = passed_db

  def login(self, access_token):
    if access_token.strip() == '':
      raise new ValidationError("No access token passed")

    # make requests to facebook graph API to get user info
    user = {
      id: "test",
      email: "test@test.com"
      first_name: "test",
      last_name: "ing"
    }

