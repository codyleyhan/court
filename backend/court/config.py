import os

class Config(object):
  DEBUG = False
  TESTING = False
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_DATABASE_URI = 'sqlite:///court.db'
  SECRET_KEY = 'USlx4cGNe7/axhJ3VbtdwFYKRYgsEH5VCV2n4dvhiFg='
  FACEBOOK_APP_ID = '298139424131898'
  FACEBOOK_APP_SECRET = '4407bbc55c09feae4074b5a49422c837'


class DevelopmentConfig(Config):
  DEBUG = True
  SQLALCHEMY_ECHO = True

class TestingConfig(Config):
  TESTING = True

class ProductionConfig(Config):
  SQLALCHEMY_ECHO = True
  SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
