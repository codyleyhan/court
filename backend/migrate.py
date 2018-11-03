from court.app import create_app
from court.database import db

app = create_app()

if __name__ == '__main__':
  db.create_all(app=app)

