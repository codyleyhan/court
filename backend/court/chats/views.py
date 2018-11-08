from flask import jsonify, request, g
from flask.views import MethodView

from court.chats.thread_service import ThreadService
from court.users.auth_service import AuthService
from court.errors import AuthorizationError


class MessageAPI(MethodView):
  def __init__(self, thread_service, auth_service):
    self.thread_service = thread_service
    self.auth_service = auth_service

  def get(self, thread_id):
    auth_service = self.auth_service
    user_id = auth_service.get_current_user_id()

    first = 50
    after_id = -1
    before_id = -1

    if request.json is not None:
      if 'first' in request.json:
        first = request.json['first']
      if 'after_id' in request.json:
        after_id = request.json['after_id']
      if 'before_id' in request.json:
        before_id = request.json['before_id']

    messages = self.thread_service.get_messages(user_id, thread_id, first, after_id, before_id)

    return jsonify(messages=messages)
  
class ThreadAPI(MethodView):
  def __init__(self, auth_service):
    self.auth_service = auth_service

  def get(self):
    print(self.auth_service.get_current_user_id())
    user = self.auth_service.get_current_user()

    return jsonify(threads=user.threads)
    