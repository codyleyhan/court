from flask import jsonify, request
from flask.views import MethodView

from court.errors import AuthorizationError, ValidationError


class UserAPI(MethodView):
  """
  Provides the view layer API for Users.
  """
  def __init__(self, auth_service):
    """
    Creates a new UserAPI object. Should be called with
    UserAPI.as_view('user_api', auth_service) to initialize.

    :param auth_service: an AuthService instance
    """
    self.auth_service = auth_service

  def post(self):
    """
    Processes a HTTP POST request for the user REST API.

    :return: a Flask HTTP response with after a selected user's login flow.
    :raises: AuthorizationError, ValidationError
    """
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
