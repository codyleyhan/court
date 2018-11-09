from flask_socketio import Namespace, disconnect, join_room, emit

# TODO (codyleyhan): figure out how we are going to send information notifications

class ThreadSockets(Namespace):
  """
  ThreadSockets is the object that handles the realtime chat aspect of court
  providing users realtime messaging between each and notifications.
  """

  def __init__(self, namespace, auth_service, thread_service):
    super(ThreadSockets, self).__init__(namespace=namespace)
    self.auth_service = auth_service
    self.thread_service = thread_service


  def on_connect(self):
    """
    Occurs when a user first connects to the server and will be authenticated.

    :param json: contains json data from the user
    """
    user_id = self.auth_service.get_current_user_id()
    if user_id is None:
      disconnect()
      return

    print(user_id, ' connected')
  
  def on_message(self, json):
    """
    Occurs when an already joined user sends a message on a thread.  Message will
    be saved and then emitted to the everyone in the room including the sender.

    :param json: contains json data from the user
    """
    user_id = self.auth_service.get_current_user_id()
    if 'thread' not in json or 'message' not in json:
      raise Exception()
    thread_id = json['thread']
    thread = self.thread_service.get_thread(user_id, thread_id)

    message_body = json['message']
    message = Message(user_id, thread_id, message_body)

    self.thread_service.add_message(message)

    print(str(user_id) + ' sent message ' + body)

    emit('new_message', message, room=thread_id)

    pass
  

  def on_join(self, json):
    """
    Occurs when a user subscribes to a realtime chat thread.  The user will have
    to pass authorization checks in order to subscribe to the realtime messages.

    :param json: contains json data from the user
    """
    user_id = self.auth_service.get_current_user_id()
    if 'thread' not in json:
      raise Exception()
    thread_id = json['thread']
    thread = self.thread_service.get_thread(user_id, thread_id)
    print(user_id, ' is joining thread ', thread_id)
    join_room(thread_id)
    
