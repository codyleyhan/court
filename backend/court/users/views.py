from flask import jsonify, request
from flask.views import MethodView

from court.errors import AuthorizationError, ValidationError


class UserAPI(MethodView):
  def __init__(self, auth_service):
    self.auth_service = auth_service

  def get(self, user_id):
    if user_id is None:
        return jsonify({
          'users': [1, 2, 3, 4]
        })
    else:
        # expose a single user
        return jsonify({
          'user': user_id
        })

  def post(self, access_token):
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

  def delete(self, user_id):
    # delete a single user
    pass

  def put(self, user_id):
    # update a single user
    pass
