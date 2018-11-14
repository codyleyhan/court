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

  def get(self):
    """
    Processes a HTTP GET request for the user REST API.

    :return: a Flask HTTP response containing a user's id and email
    :raises: AuthorizationError, ValidationError
    """
    user = self.auth_service.get_current_user()
    return jsonify(user=user._asdict())

  def post(self):
    """
    Processes a HTTP POST request for the user REST API.

    :return: a Flask HTTP response after a selected user's login flow.
    :raises: AuthorizationError, ValidationError
    """
    access_token = request.args.get('access_token')
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

class ProfileAPI(MethodView):
  """
  Provides the view layer API for Profiles.
  """
  def __init__(self, auth_service):
    """
    Creates a new ProfileAPI object. Should be called with
    ProfileAPI.as_view('user_api', auth_service) to initialize.

    :param auth_service: an AuthService instance
    """
    self.auth_service = auth_service

  def get(self):
    """
    Processes a HTTP GET request for the profile REST API.

    :return: a Flask HTTP response with a User's associated Profile.
    """
    profile = self.auth_service.get_current_user_profile()
    return jsonify(profile=profile._asdict())

  def put(self):
    """
    Processes a HTTP PUT request for the profile REST API.

    :return: a Flask HTTP response with a User's associated Profile.
    """
    fields = request.get_json()
    profile = self.auth_service.update_current_user_profile(fields)
    return jsonify(profile=profile._asdict())

  def delete(self):
    """
    Processes a HTTP DELETE request for the profile REST API.

    :return: a Flask HTTP response with a User's associated Profile.
    """
    return jsonify({'status': 'need to implement profile API'})
