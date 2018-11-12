from court.config import TestingConfig
from court.app import create_app


app = create_app(TestingConfig)