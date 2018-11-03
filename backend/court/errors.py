from http import HTTPStatus

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
  status_code = HTTPStatus.BAD_REQUEST

  def __init__(self, message, status_code=BAD_REQUEST):
    APIError.__init__(self, message, status_code)

class AuthorizationError(APIError):
  status_code = HTTPStatus.BAD_REQUEST

  def __init__(self, message, status_code=BAD_REQUEST):
    APIError.__init__(self, message, status_code)