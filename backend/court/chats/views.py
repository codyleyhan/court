from flask import jsonify, request, g
from flask.views import MethodView

from court.chats.thread_service import ThreadService
from court.users.auth_service import AuthService
from court.errors import AuthorizationError


class MessageAPI(MethodView):
  """
  Provides the view layer API for messages
  """
  def __init__(self, thread_service, auth_service):
    """
    Creates a new MessageAPI object.  Should be called with 
    MessageAPI.as_view(url, thread_service, auth_service) to initialize.

    :param thread_service: a ThreadService instance
    :type thread_service: court.chats.thread_service.ThreadService
    :param auth_service: an AuthService instance
    :type auth_service: court.users.auth_service.AuthService
    """
    self.thread_service = thread_service
    self.auth_service = auth_service

  def get(self, thread_id):
    """
    Processes a HTTP GET request for the message REST API.

    Example request:

    .. code-block:: bash

    GET localhost:8000/api/threads/1/messages

    Example response:

    .. code-block:: json

      {
        "messages": [
          {
            "id": 1,
            "user_id": 14324324,
            "body": "this is the message body"
          }
        ]
      }

    :param thread_id: the id of the thread requested

    :type thread_id: int
    :return: a Flask HTTP response with a list of thread messages
    """
    auth_service = self.auth_service
    user_id = auth_service.get_current_user_id()

    first = 50
    after_id = -1
    before_id = -1

    if 'first' in request.args:
      first = request.args.get('first')
    if 'after_id' in request.args:
      after_id = request.args.get('after_id')
    elif 'before_id' in request.args:
      before_id = request.args.get('before_id')

    messages = self.thread_service.get_messages(user_id, thread_id, first, after_id, before_id)

    return jsonify(messages=messages)
  
class ThreadAPI(MethodView):
  """
  Provides the view layer API for threads
  """
  def __init__(self, auth_service):
    """
    Creates a new ThreadAPI object.  Should be called with 
    ThreadAPI.as_view(url, auth_service) to initialize.

    :param auth_service: an AuthService instance
    :type auth_service: court.users.auth_service.AuthService
    """
    self.auth_service = auth_service

  def get(self):
    """
    Processes a HTTP GET request for the thread REST API.

    Example request:

    .. code-block:: bash

    GET localhost:8000/api/threads

    Example response:
    
    .. code-block:: json

      {
        "threads": [
          {
            "id": 1,
            "is_active": true,
            "users": [
              {
                "id": 1232434,
                "email": "test@test.com"
              },
              {
                "id": 43532454535,
                "email": "another@another.com"
              }
            ]
          }
        ]
      }

    :return: a Flask HTTP response of all users threads
    """
    user = self.auth_service.get_current_user()

    return jsonify(threads=user.threads)
    