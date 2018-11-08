from http import HTTPStatus
from flask import Flask, g, jsonify, request

from court.chats.thread_service import ThreadService
from court.chats.views import MessageAPI, ThreadAPI
from court.config import DevelopmentConfig
from court.database import db
from court.errors import *
from court.users.auth_service import AuthService
from court.users.views import UserAPI, login_required

def create_app(config=DevelopmentConfig):
  app = Flask(__name__)
  app.config.from_object(config)

  db.init_app(app)
  add_error_handlers(app)
  add_routes(app)

  return app

def add_error_handlers(app):
  app.register_error_handler(HTTPStatus.INTERNAL_SERVER_ERROR, ErrorHandler.handle_internal_server)
  app.register_error_handler(HTTPStatus.NOT_FOUND, ErrorHandler.handle_not_found)
  app.register_error_handler(ValidationError, ErrorHandler.handle_error_with_message)
  app.register_error_handler(AuthorizationError, ErrorHandler.handle_error_with_message)
  app.register_error_handler(NotFoundError, ErrorHandler.handle_error_with_message)

def add_routes(app):
  auth_service = AuthService(app.config['SECRET_KEY'])

  @app.before_request
  def check_for_token():
    if request.headers.get('Authorization') is not None:
      token = request.headers.get('Authorization')
      auth_service.validate_token(token)


  user_view = UserAPI.as_view('user_api', auth_service)
  app.add_url_rule('/api/users/', view_func=user_view, methods=['POST'])

  thread_service = ThreadService()
  thread_view = login_required(ThreadAPI.as_view('thread_api', auth_service))
  thread_message_view = login_required(MessageAPI.as_view('message_api', thread_service, auth_service))
  app.add_url_rule('/api/threads', view_func=thread_view, methods=['GET'])
  app.add_url_rule('/api/threads/<int:thread_id>/messages', view_func=thread_message_view,
    methods=['GET'])

  @app.route('/')
  def health_check():
    return jsonify({
      "health": "ok"
    })