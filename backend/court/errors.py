from http import HTTPStatus
from flask import jsonify

class APIError(Exception):
  """
  This is a catchall standard API error
  """
  status_code = HTTPStatus.INTERNAL_SERVER_ERROR

  def __init__(self, message, status_code=None):
    """
    :param message(string): the error message
    :param status_code(int): the associated HTTP status code
    """
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
      self.status_code = status_code

  def to_dict(self):
    return {
      'success': False,
      'message': self.message
    }

class ValidationError(APIError):
  """
  Occurs when a user provides invalid data

  :param message(string): the error message
  """
  def __init__(self, message='Not a valid request'):
    APIError.__init__(self, message, HTTPStatus.BAD_REQUEST)

class AuthorizationError(APIError):
  """
  Occurs when a user tries to access a resource they are not allowed to.

  :param message(string): the error message
  """
  def __init__(self, message='Not authorized'):
    APIError.__init__(self, message, HTTPStatus.UNAUTHORIZED)

class NotFoundError(APIError):
  """
  Occurs when a resource is requested that does not exists.

  :param message(string): the error message
  """
  def __init__(self, message='Not found'):
    APIError.__init__(self, message, HTTPStatus.NOT_FOUND)


class ErrorHandler:
  """
  JSON API error handler
  """

  @staticmethod
  def handle_error_with_message(e):
    """
    :param e(court.errors.APIError): the error message
    """
    return jsonify({
      'success': False,
      'error': e.message
    })
  
  @staticmethod
  def handle_not_found(e):
    """
    :param e(court.errors.NotFoundError): the error message
    """
    return jsonify({
      'success': False,
      'error': "Page not found"
    })
  
  @staticmethod
  def handle_internal_server(e):
    """
    :param e(Exception): the error message
    """
    return jsonify({
      'success': False,
      'error': "There was a problem on our end"
    })