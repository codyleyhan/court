from flask import jsonify, request
from flask.views import MethodView


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
        pass

  def post(self):
    # create a new user
    pass

  def delete(self, user_id):
    # delete a single user
    pass

  def put(self, user_id):
    # update a single user
    pass