from flask import Flask

from court.config import DevelopmentConfig
from court.database import db

def create_app(config=DevelopmentConfig):
  app = Flask(__name__)
  app.config.from_object(config)

  db.init_app(app)

  @app.route('/hello')
  def hello():
      return 'Hello, World!'

  return app