from http import HTTPStatus
from flask import jsonify

class APIError(Exception):
  """
  This is a catchall standard API error
  """
  status_code = HTTPStatus.INTERNAL_SERVER_ERROR

  def __init__(self, message, status_code=None):
    """
    :param message: the error message
    :type message: str
    :param status_code: the associated HTTP status code
    :type status_code: int
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

  :param message: the error message
  :type message: string
  """
  def __init__(self, message='Not a valid request'):
    APIError.__init__(self, message, HTTPStatus.BAD_REQUEST)

class AuthorizationError(APIError):
  """
  Occurs when a user tries to access a resource they are not allowed to.

  :param message: the error message
  :type message: string
  """
  def __init__(self, message='Not authorized'):
    APIError.__init__(self, message, HTTPStatus.UNAUTHORIZED)

class NotFoundError(APIError):
  """
  Occurs when a resource is requested that does not exists.

  :param message: the error message
  :type message: string
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
    :param e: the error message
    :type e: court.errors.APIError
    """
    status_code = getattr(e, 'status_code', HTTPStatus.INTERNAL_SERVER_ERROR)

    return jsonify({
      'success': False,
      'error': e.message
    }), status_code

  @staticmethod
  def handle_not_found(e):
    """
    :param e: the error message
    :type e: court.errors.NotFoundError
    """
    return jsonify({
      'success': False,
      'error': "Page not found"
    }), HTTPStatus.NOT_FOUND

  @staticmethod
  def handle_internal_server(e):
    """
    :param e: the error message
    :type e: Exception
    """
    return jsonify({
      'success': False,
      'error': "There was a problem on our end"
    }), HTTPStatus.INTERNAL_SERVER_ERROR
