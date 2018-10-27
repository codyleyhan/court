from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from court.database import db

app = Flask(__name__)
app.config.from_object('court.config.DevelopmentConfig')
db.init_app(app)

from court.chats.models import *
from court.users.models import *

db.create_all(app=app)