from flask import Flask

from court.config import DevelopmentConfig
from court.database import db
from court.users.auth import AuthService
from court.users.views import UserAPI

def create_app(config=DevelopmentConfig):
	app = Flask(__name__)
	app.config.from_object(config)

	db.init_app(app)
	add_routes(app)

	return app

def add_routes(app):
	auth_service = AuthService(app.config['SECRET_KEY'])
	user_view = UserAPI.as_view('user_api', auth_service)
	app.add_url_rule('/api/users/', defaults={'user_id': None},
		view_func=user_view, methods=['GET'])
	app.add_url_rule('/api/users/', view_func=user_view, methods=['POST'])
	app.add_url_rule('/api/users/<int:user_id>', view_func=user_view,
		methods=['GET', 'PUT', 'DELETE'])