import os

from flask_socketio import SocketIO

from court.app import create_app
from court.config import ProductionConfig, DevelopmentConfig

env = os.getenv('ENV')
config = ProductionConfig if env == 'production' else DevelopmentConfig


app = create_app(config)

if __name__ == '__main__':
  socketio = SocketIO(app)
  socketio.run(app, host='0.0.0.0')
