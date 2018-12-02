from flask import g

from court.database import db
from court.chats.thread_service import ThreadService
from court.chats.models import Thread, Message
from court.users.auth_service import AuthService
from court.errors import AuthorizationError, NotFoundError

import pytest

def test_create_thread(app):
  with app.app_context():
    auth_service = AuthService('secret')
    thread_service = ThreadService()
    user1 = auth_service.get_user_for_user_id(100)
    user2 = auth_service.get_user_for_user_id(101)

    # test runtime error for users that do not exist
    with pytest.raises(RuntimeError):
      thread = thread_service.create_thread(user1, user2)
      assert thread is None

  with app.app_context():
    auth_service = AuthService('secret')
    thread_service = ThreadService()
    user1 = auth_service.get_user_for_user_id(1)
    user2 = auth_service.get_user_for_user_id(2)

    # test not creating duplicate thread for thread that already exists
    thread = thread_service.create_thread(user1, user2)
    assert thread is None

  with app.app_context():
    auth_service = AuthService('secret')
    thread_service = ThreadService()
    user1 = auth_service.get_user_for_user_id(1)
    user2 = auth_service.get_user_for_user_id(2)

    # test overriding thread for thread that already exists
    thread = thread_service.create_thread(user1, user2, force=True)
    assert thread is not None and thread.is_active is True

  with app.app_context():
    auth_service = AuthService('secret')
    thread_service = ThreadService()
    user3 = auth_service.get_user_for_user_id(3)
    user4 = auth_service.get_user_for_user_id(4)

    # test new thread creation
    thread = thread_service.create_thread(user3, user4)
    assert thread

def test_create_threads(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    user = auth_service.get_current_user()
    matches = { '2': '', '3': '', '4': '' }
    threads = thread_service.create_threads(user, matches)

    # test threads are created for all matches
    assert threads is True

def test_get_thread(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    thread = thread_service.get_thread(1, 1)
    assert 1 in [ user.id for user in thread.users ]

  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    with pytest.raises(AuthorizationError):
      thread = thread_service.get_thread(100, 1)

  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    with pytest.raises(NotFoundError):
      thread = thread_service.get_thread(1, 100)

def test_user_is_in_thread(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    thread = thread_service.get_thread(1, 1)
    inclusion = thread_service.user_is_in_thread(1, thread)
    assert inclusion == True

  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    thread = thread_service.get_thread(1, 1)
    inclusion = thread_service.user_is_in_thread(3, thread)
    assert inclusion == False

  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    thread = thread_service.get_thread(1, 1)
    inclusion = thread_service.user_is_in_thread(0, thread)
    assert inclusion == True

def test_get_messages(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    messages = thread_service.get_messages(1, 1)
    assert messages is not None

def test_add_message(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    with pytest.raises(RuntimeError):
      thread_service.add_message(None)

  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    old_messages = thread_service.get_messages(1, 1)
    assert len(old_messages) == 2

    message = Message(1, 1, 'testing')
    message_added = thread_service.add_message(message)
    assert message_added is not None

    new_messages = thread_service.get_messages(1, 1)
    assert len(new_messages) == 3

def test_update_chat_state(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    with pytest.raises(RuntimeError):
      thread_service.update_chat_state(None, None)

  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    update = thread_service.update_chat_state(1, 1)
    assert update is not None

  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    old_update = thread_service.update_chat_state(1, 1)
    assert old_update is not None

    message1 = Message(1, 1, 'testing1')
    message2 = Message(2, 1, 'testing2')
    message_added = thread_service.add_message(message2)
    message_added = thread_service.add_message(message1)

    new_update = thread_service.update_chat_state(2, 1)
    assert new_update is not None and old_update != new_update

def test_delete_thread(app):
  with app.app_context():
    g.user_id = '1'
    auth_service = AuthService('secret')
    thread_service = ThreadService()

    old_thread = thread_service.get_thread(1, 1)
    assert old_thread.is_active == True

    deleted = thread_service.delete_thread(2)

    new_thread = thread_service.get_thread(1, 1)
    assert new_thread.is_active == False

