from http import HTTPStatus

class ValidationError(Exception):
  status_code = HTTPStatus.BAD_REQUEST

  def __init__(self, message, status_code=None):
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
      self.status_code = status_code

  def to_dict(self):
    return {
      status: self.status_code
      message: self.message
    }