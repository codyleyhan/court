from flask import jsonify, g, request
from flask.views import MethodView
from functools import wraps


from court.errors import AuthorizationError, ValidationError


class UserAPI(MethodView):
  def __init__(self, auth_service):
    self.auth_service = auth_service

  def post(self):
    access_token = request.json['access_token']
    if access_token is None:
      raise AuthorizationError()
    print(access_token)
    # create a new user
    try:
      token, user = self.auth_service.login(access_token)
      return jsonify({
        'success': True,
        'token': token,
        'user': user
      })
    except (AuthorizationError, ValidationError) as e:
      return jsonify({
        'success': False,
        'error': e.message
      })

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in g:
            raise AuthorizationError()
        return f(*args, **kwargs)
    return decorated_function
