from http import HTTPStatus
from flask import jsonify

class APIError(Exception):
  status_code = HTTPStatus.INTERNAL_SERVER_ERROR

  def __init__(self, message, status_code=None):
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
      self.status_code = status_code

  def to_dict(self):
    return {
      'status': self.status_code,
      'message': self.message
    }

class ValidationError(APIError):
  def __init__(self, message='Not a valid request'):
    APIError.__init__(self, message, HTTPStatus.BAD_REQUEST)

class AuthorizationError(APIError):
  def __init__(self, message='Not authorized'):
    APIError.__init__(self, message, HTTPStatus.UNAUTHORIZED)

class NotFoundError(APIError):
  def __init__(self, message='Not found'):
    APIError.__init__(self, message, HTTPStatus.NOT_FOUND)


class ErrorHandler:
  @staticmethod
  def handle_error_with_message(e):
    return jsonify({
      'error': e.message
    })
  
  @staticmethod
  def handle_not_found(e):
    return jsonify({
      'error': "Page not found"
    })
  
  @staticmethod
  def handle_internal_server(e):
    return jsonify({
      'error': "There was a problem on our end"
    })