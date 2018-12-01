from flask_socketio import Namespace, disconnect, join_room, emit
from flask import request, g

from court.chats.models import Message

class ThreadSockets(Namespace):
  """
  ThreadSockets is the object that handles the realtime chat aspect of court
  providing users realtime messaging between each and notifications.
  """

  def __init__(self, namespace, auth_service, thread_service, match_service, logger):
    super(ThreadSockets, self).__init__(namespace=namespace)
    self.auth_service = auth_service
    self.thread_service = thread_service
    self.match_service = match_service
    self.logger = logger

  def get_user_from_request(self):
    self.auth_service.validate_token(request.args.get('token'))
  
  def on_connect(self):
    """
    Occurs when a user first connects to the server and will be authenticated.

    :param json: contains json data from the user
    """
    self.logger.info("a new user is trying to connect")
    self.get_user_from_request()
    user_id = self.auth_service.get_current_user_id()
    self.logger.info("%s connected has connected", user_id)
    
    emit('connected', {
      "body": "you are connected"
    }, json=True)
  
  def on_message(self, json):
    """
    Occurs when an already joined user sends a message on a thread.  Message will
    be saved and then emitted to the everyone in the room including the sender.
    Unlocks the next profile feature if enough messages have been sent

    Example json:

    .. code-block:: json

      {
        "thread": 1,
        "body": "a new message"
      }

    :param json: contains json data from the user
    """
    self.get_user_from_request()
    user_id = self.auth_service.get_current_user_id()
    if 'thread' not in json or 'body' not in json:
      self.logger.error("%s sent a message without the right data", user_id)
      raise Exception()
    thread_id = json['thread']
    thread = self.thread_service.get_thread(user_id, thread_id)

    self.logger.info("%s is trying to add a message to the thread %d", user_id, thread_id)

    message_body = json['body']
    message = Message(user_id, thread_id, message_body)

    self.thread_service.add_message(message)

    self.logger.info("%s added a message to the thread %d", user_id, thread_id)

    message_pairs = self.thread_service.update_chat_state(user_id, thread_id)
    if message_pairs > 0 and message_pairs % 5 == 0:
      unlocked = self.match_service.unlock_next_profile_feature(user_id)
      self.logger.info("%s unlocked %d%  of the profile information", user_id, unlocked[0])

    emit('new_message', message, room=thread_id, broadcast=True, json=True)
  

  def on_join(self, json):
    """
    Occurs when a user subscribes to a realtime chat thread.  The user will have
    to pass authorization checks in order to subscribe to the realtime messages.

    Example json:

    .. code-block:: json

      {
        "thread": 1
      }

    :param json: contains json data from the user
    """
    self.get_user_from_request()
    user_id = self.auth_service.get_current_user_id()
    if 'thread' not in json:
      self.logger.error("%s did not pass a thread to join", user_id)
      raise Exception()
    thread_id = json['thread']
    thread = self.thread_service.get_thread(user_id, thread_id)

    self.logger.info("connecting user %s to thread %d", user_id, thread_id)
    join_room(thread_id)
    
