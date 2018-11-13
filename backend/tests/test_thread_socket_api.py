from flask_socketio import SocketIOTestClient

from court.sockets import socketio
from court.chats.models import Message

from .shared import token_for_user_1, token_for_user_2, token_for_user_3

def test_thread_message_events(app):
  """
  Tests all parts of the chat thread sockets API.
  1. Connecting to the websocket
  2. Subscribing to a thread message stream
  3. Adding a message to a thread and ensuring everyone in thread receives message
  """
  with app.app_context():
    client = socketio.test_client(app, query_string='?token=' + token_for_user_1)
    listening_client = socketio.test_client(app, query_string='?token=' + token_for_user_2)
    client_not_in_thread = socketio.test_client(app, query_string='?token=' + token_for_user_3)
    join_room = {
      'thread': 1
    }
    client.emit('join', join_room)
    listening_client.emit('join', join_room)
    client_not_in_thread.emit('join', join_room)

    message = {
      'thread': 1,
      'body': 'a big test'
    }
    client.emit('message', message)

    received_events = client.get_received()
    assert len(received_events) == 2
    assert received_events[0]['name'] == 'connected'
    assert received_events[1]['name'] == 'new_message'
    assert len(received_events[1]['args']) == 1
    # in tests socket io will return object, when not using test client will return json
    assert isinstance(received_events[1]['args'][0], Message)

    # ensure message saved in db
    saved_message = Message.query.get(3) 
    assert saved_message.body == message['body']
    assert saved_message.user_id == 1

    # check that another client in the same channel received the new_message event
    client_received_events = listening_client.get_received()
    assert len(client_received_events) == 2
    assert client_received_events[1]['name'] == 'new_message'
    assert len(client_received_events[1]['args']) == 1
    assert isinstance(client_received_events[1]['args'][0], Message)

    # ensure that a client not in the thread cannot subscribe to messages
    events = client_not_in_thread.get_received()
    assert len(events) == 2
    assert events[1]['name'] == 'error'
    assert events[1]['args'][0]['success'] == False
    assert events[1]['args'][0]['message'] == 'Not authorized'


def test_thread_socket_auth(app):
  with app.app_context():
    client = socketio.test_client(app)
    events = client.get_received()
    
    # check to see that we are not authorized when trying to connect
    assert len(events) == 1
    assert events[0]['name'] == 'error'
    assert events[0]['args'][0]['success'] == False
    assert events[0]['args'][0]['message'] == 'Not authorized'