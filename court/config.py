class Config(object):
  DEBUG = False
  TESTING = False
  SQLALCHEMY_DATABASE_URI = 'sqlite:///court.db'
  SECRET_KEY = 'USlx4cGNe7/axhJ3VbtdwFYKRYgsEH5VCV2n4dvhiFg='


class DevelopmentConfig(Config):
  DEBUG = True
  ENV = 'Development'

class TestingConfig(Config):
  TESTING = True
