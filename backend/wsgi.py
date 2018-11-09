from flask_socketio import SocketIO

from court.app import create_app

app = create_app()

if __name__ == '__main__':
  socketio = SocketIO(app)
  socketio.run(app, host='0.0.0.0')
