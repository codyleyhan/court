from court.chats.models import Message, Thread
from court.database import db
from court.errors import AuthorizationError

class ThreadService:
  def __init__(self, db, message_store=Message, thread_store=Thread):
    self.message_store = message_store
    self.thread_store = thread_store
    self.db = db

  def create_thread(self, user_1, user_2):
    if user_1 is None or user_2 is None:
      raise RuntimeError()

    thread = Thread()
    
    thread.users.append(user_1)
    thread.users.append(user_2)
    
    db.session.add(thread)
    db.session.commit()

    return thread

  def get_thread(self, current_user_id, thread_id):
    thread = self.thread_store.query.get(thread_id)
    if not self.user_is_in_thread(current_user_id, thread):
      raise AuthorizationError()
    return thread

  def user_is_in_thread(self, current_user_id, thread):
    for user in thread.users:
      if current_user_id == user.id:
        return True
    return False

  def get_messages(self, current_user_id, thread_id, first=50, after_id=-1, before_id=-1):
    thread = self.thread_store.query.get(thread_id)
    if not user_is_in_thread(current_user_id, thread):
      raise AuthorizationError()

    if after_id == -1 and before_id == -1:
      messages = self.message_store.query
        .filter(Message.thread_id == thread_id)
        .order_by(Message.id.desc())
        .limit(first)
        .all()
      return messages

    query = self.message_store.query.filter(Message.thread_id == thread_id)

    if after_id != -1:
      query = query.filter(after_id < Message.id)
    else:
      query = query.filter(Message.id < before_id)

    messages = query.order_by(Message.id.desc())
      .limit(first)
      .all()
    
    return messages
  
  def add_message(self, current_user_id, thread_id, message):
    if message is None:
      raise RuntimeError()

    thread = self.thread_store.query.get(thread_id)
    if not user_is_in_thread(current_user_id, thread):
      raise AuthorizationError()

    db.session.add(message)
    db.session.commit()

    return message
