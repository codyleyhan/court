from flask_socketio import Namespace, emit

class ThreadSockets(Namespace):
  """
  ThreadSockets is the object that handles the realtime chat aspect of court
  providing users realtime messaging between each and notifications.
  """


  def on_connect(self, json):
    """
    Occurs when a user first connects to the server and will be authenticated.

    :param json: contains json data from the user
    """
    pass
  
  def on_message(self, json):
    """
    Occurs when an already joined user sends a message on a thread.  Message will
    be saved and then emitted to the everyone in the room including the sender.

    :param json: contains json data from the user
    """
    pass
  

  def on_join(self, json):
    """
    Occurs when a user subscribes to a realtime chat thread.  The user will have
    to pass authorization checks in order to subscribe to the realtime messages.

    :param json: contains json data from the user
    """
    pass