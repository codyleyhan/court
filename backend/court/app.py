from http import HTTPStatus
from flask import Flask, g, jsonify, request,json
from flask_socketio import SocketIO, emit

from court.chats.sockets import ThreadSockets
from court.chats.thread_service import ThreadService
from court.chats.views import MessageAPI, ThreadAPI
from court.config import DevelopmentConfig
from court.database import db
from court.sockets import socketio
from court.errors import *
from court.users.auth_service import AuthService
from court.users.views import ProfileAPI, UserAPI
from court.matches.match_service import MatchService
from court.matches.views import MatchAPI


def create_app(config=DevelopmentConfig):
  """
  Creates Court Flask application and initializes all necessary databases.

  :param config: The configuration object to be used in Court backend creation.
  :type config: court.config.Config
  :return: Created/initialized Flask application.
  """
  app = Flask(__name__)
  app.config.from_object(config)

  db.init_app(app)

  add_error_handlers(app)
  add_routes(app, socketio)

  socketio.init_app(app, json=json)

  return app

def add_error_handlers(app):
  """
  Adds error handling endpoints to Flask.

  :param app: The configured Flask backend application to add endpoints to.
  :return: None.
  """
  app.register_error_handler(HTTPStatus.INTERNAL_SERVER_ERROR, ErrorHandler.handle_internal_server)
  app.register_error_handler(HTTPStatus.NOT_FOUND, ErrorHandler.handle_not_found)
  app.register_error_handler(ValidationError, ErrorHandler.handle_error_with_message)
  app.register_error_handler(AuthorizationError, ErrorHandler.handle_error_with_message)
  app.register_error_handler(NotFoundError, ErrorHandler.handle_error_with_message)

def add_routes(app, socketio):
  """
  Adds callable endpoints to Flask.

  :param app: The configured Flask backend application to add endpoints to.
  :param socketio: The configured socketio instance
  :return: None.
  """
  auth_service = AuthService(app.config['SECRET_KEY'])

  @app.before_request
  def check_for_token():
    if request.headers.get('Authorization') is not None:
      token = request.headers.get('Authorization')
      auth_service.validate_token(token)

  # register user views
  user_view = UserAPI.as_view('user_api', auth_service)
  profile_view = auth_service.login_required(ProfileAPI.as_view('profile_api', auth_service))
  app.add_url_rule('/api/users', view_func=user_view, methods=['POST'])
  app.add_url_rule('/api/users', view_func=profile_view, methods=['GET', 'PUT'])

  # register thread views
  thread_service = ThreadService()
  thread_view = auth_service.login_required(ThreadAPI.as_view('thread_api', auth_service))
  thread_message_view = auth_service.login_required(MessageAPI.as_view('message_api', thread_service, auth_service))
  app.add_url_rule('/api/threads', view_func=thread_view, methods=['GET'])
  app.add_url_rule('/api/threads/<int:thread_id>/messages', view_func=thread_message_view,
    methods=['GET'])
  app.add_url_rule('/api/threads/<int:user_id>', view_func=thread_message_view, methods=['DELETE'])

  # register match views
  match_service = MatchService()
  match_view = auth_service.login_required(MatchAPI.as_view('match_api', match_service, auth_service, thread_service))
  app.add_url_rule('/api/matches', view_func=match_view, methods=['GET'])
  app.add_url_rule('/api/matches/<int:user_id>', view_func=match_view, methods=['DELETE'])

  # register socket
  socketio.on_namespace(ThreadSockets(None, auth_service, thread_service, match_service, app.logger))
  @socketio.on_error_default
  def handle_socket_error(e):
    emit('error', e.to_dict())

  @app.route('/')
  def health_check():
    return jsonify({
      'health': 'ok'
    })

  @app.route('/api/force_match/<int:user_id>')
  def force_match(user_id):
    user1 = auth_service.get_current_user()
    user2 = auth_service.get_user_for_user_id(user_id)
    user1_dict = user1.profile._asdict()
    user2_dict = user2.profile._asdict()
    user1_interests = set(user1_dict['interests'].keys())
    user2_interests = set(user2_dict['interests'].keys())
    shared_interests = user1_interests & user2_interests
    if len(shared_interests) == 0:
      return jsonify(success=False)
    shared_interest_key = shared_interests.pop()
    interest = { shared_interest_key :
                 user1_dict['interests'][shared_interest_key] }
    success = match_service.add_match_to_profile(user_id, interest, force=True)
    thread = thread_service.create_thread(user1, user2, force=True)
    return jsonify(success=success and thread is not None)

  @app.route('/api/force_match_delete/<int:user_id>')
  def force_match_delete(user_id):
    delete_match = match_service.inactivate_match(user_id, purge=True)
    delete_thread = thread_service.delete_thread(user_id, purge=True)
    return jsonify(status=delete_match and delete_thread)

  @app.route('/api/force_unlock/<int:user_id>')
  def force_unlock(user_id):
    match, user = match_service.unlock_next_profile_feature(user_id)
    return jsonify(matched_user_unlock=match, current_user_unlock=user)
