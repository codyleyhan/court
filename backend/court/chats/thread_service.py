from court.chats.models import Message, Thread
from court.users.models import User, SYSTEM_USER
from court.database import db
from court.errors import AuthorizationError, NotFoundError

class ThreadService:
  """
  Handles all business logic for creating and managing user's chat threads.
  """


  def __init__(self, db_conn=db, message_store=Message, thread_store=Thread):
    """
    Constructs a new ThreadService.

    :param db_conn: a SQLAlchemy database connection
    :param message_store: ORM object to create/query messages
    :param thread_store: ORM object to create/query chat threads
    """
    self.message_store = message_store
    self.thread_store = thread_store
    self.db = db_conn


  def create_thread(self, user_1, user_2, force=False):
    """
    Creates and persists a new chat thread between the users passed.

    :param user_1: is a User object
    :type user_1: court.users.models.User
    :param user_2: is a User object
    :type user_2: court.users.models.User
    :param force: optional argument to override previous thread with user
    :type force: boolean

    :return: returns a Thread object with the two users associated
    :rtype: court.chats.models.Thread
    """
    if user_1 is None or user_2 is None:
      raise RuntimeError()

    if not force:
      threads = self.db.session.query(Thread).filter(Thread.users.any(id=user_1.id)).all()
      if threads is not None and len(threads) != 0:
        return None

    thread = Thread()

    thread.users.append(user_1)
    thread.users.append(user_2)

    self.db.session.add(thread)
    self.db.session.commit()

    return thread

  def get_thread(self, current_user_id, thread_id):
    """
    Queries for a thread with the passed id.  Will also check authorization of
    user.

    :param current_user_id: the id the user requesting the thread information
    :type current_user_id: int
    :param thread_id: the id of the thread being requested
    :type thread_id: int

    :return: a Thread object associated with the thread_id
    :rtype: court.chats.models.Thread
    """
    thread = self.thread_store.query.get(thread_id)
    if thread is None:
      raise NotFoundError("No thread found with id of %r" % thread_id)
    if not self.user_is_in_thread(current_user_id, thread):
      raise AuthorizationError()
    return thread

  def user_is_in_thread(self, user_id, thread):
    """
    Checks if a user is authorized to be in a thread. If the user id is the
    system user id, then it will return true.

    :param user_id: the user id being checked
    :type user_id: int
    :param thread: Thread object that is being checked
    :type thread: court.chats.models.Thread

    :return: true if the user is authorized to see the thread
    :rtype: bool
    """
    if user_id == SYSTEM_USER:
      return true
    for user in thread.users:
      if user_id == user.id:
        return True
    return False

  def get_messages(self, current_user_id, thread_id, first=50, after_id=-1, before_id=-1):
    """
    Fetches paginated thread messages in descending order.  If both after_id and
    before_id are passed then only after_id will be used.

    :param current_user_id: the user requesting the messages
    :type current_user_id: int
    :param thread_id: the id of the thread the messages are being requested
    :type thread_id: int
    :param first: the number of messages to return upto, default 50
    :type first: int
    :param after_id: if passed returns all messages with id greater than after_id
    :type after_id: int
    :param before_id: if passed returns all messages with id less than before_id
    :type before_id: int

    :return: list of thread messages
    """
    thread = self.get_thread(current_user_id, thread_id)

    if after_id != -1 and before_id != -1:
      before_id = -1

    query = self.message_store.query.filter(Message.thread_id == thread_id)

    if after_id != -1:
      query = query.filter(after_id < Message.id)
    elif before_id != -1:
      query = query.filter(Message.id < before_id)

    messages = query.order_by(Message.id.desc()).limit(first).all()

    return messages

  def add_message(self, message):
    """
    Adds a message to a thread.

    :param message: a message object
    :type message: court.chats.models.Message
    :return: message with id added
    :rtype: court.chats.models.Message
    """
    if message is None:
      raise RuntimeError()

    thread = self.get_thread(message.user_id, message.thread_id)

    self.db.session.add(message)
    self.db.session.commit()

    return message

  def delete_thread(self, user_id, purge=False):
    """
    Deletes a thread to a specified user_id

    :param user_id: the specified user id
    :type user_id: int
    :param purge: optional argument to mark thread inactive or delete from database
    :type purge: boolean
    :return: whether the thread was successfully deleted or not
    :rtype: boolean
    """
    threads = self.db.session.query(Thread).filter(Thread.users.any(id=user_id)).all()
    if threads is None or len(threads) == 0:
      return False

    for thread in threads:
      if purge:
        self.db.session.delete(thread)
      else:
        setattr(thread, 'is_active', False)
    self.db.session.commit()

    return True
