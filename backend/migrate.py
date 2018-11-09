import os

from court.app import create_app
from court.database import db
from court.config import ProductionConfig, DevelopmentConfig

env = os.getenv('ENV')
config = ProductionConfig if env == 'production' else DevelopmentConfig

app = create_app(config=config)

if __name__ == '__main__':
  db.create_all(app=app)

