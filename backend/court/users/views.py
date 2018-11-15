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
    :type auth_service: court.users.auth_service.AuthService
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

    An example request is below:

    .. code-block:: bash

      POST localhost:8000/api/users?access_token={facebook access token for user}


    Example response:

    .. code-block:: json

      {
        "success": true,
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTAyNzczNDM3NDAwMjUxLCJpc19hZG1pbiI6ZmFsc2V9.qVJ99o4cG1xsHAac2ztrBsyExST76pDlzhnJx9Nxt0s",
        "user": {
          "email": "kfgzlneeuo_1541453454@tfbnw.net",
          "first_name": "Will",
          "id": "102773437400251",
          "last_name": "Occhinoberg",
          "picture": {
            "data": {
              "height": 320,
              "is_silhouette": true,
              "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=102773437400251&height=300&width=300&ext=1544820635&hash=AeQAGANVCW2xEscN",
              "width": 320
            }
          }
        }
      }

    :return: a Flask HTTP response with after a selected user's login flow.
    :raises: AuthorizationError, ValidationError
    """
    access_token = request.args.get('access_token')
    if access_token is None:
      raise AuthorizationError()
    # create a new user
    try:
      token, user, exists = self.auth_service.login(access_token)
      return jsonify({
        'success': True,
        'token': token,
        'user': user,
        'exists': exists
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
    fields = request.args.to_dict(flat=True)
    profile = self.auth_service.update_current_user_profile(fields)
    return jsonify(profile=profile._asdict())
