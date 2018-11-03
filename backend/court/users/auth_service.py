import jwt

from court.database import db
from court.errors import ValidationError
from court.users.models import User, Profile

class AuthService:
  def __init__(self, secret):
    self.secret = secret

  def login(self, access_token):
    if access_token.strip() == '':
      raise ValidationError()

    # make requests to facebook graph API to get user info
    user = {
      'id': 'test',
      'email': 'test@test.com',
      first_name: 'test',
      last_name: 'ing'
    }

    token_data = {
      'id': user.id,
      'is_admin': False
    }

    token = jwt.encode(token_data, self.secret, algorithm='HS256')

    return token

