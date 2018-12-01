from flask import jsonify, request
from flask.views import MethodView

from court.errors import AuthorizationError, ValidationError

class MatchAPI(MethodView):
  """
  Provides the view layer API for Matches.
  """
  def __init__(self, match_service, auth_service, thread_service):
    """
    Creates a new MatchAPI object. Should be called with
    MatchAPI.as_view('match_api', match_service, auth_service, thread_service) to initialize.

    :param match_service: a MatchService instance
    :type match_service: court.matches.match_service.MatchService
    :param auth_service: an AuthService instance
    :type auth_service: court.users.auth_service.AuthService
    :param thread_service: a ThreadService instance
    :type thread_service: court.users.thread_service.ThreadService
    """
    self.match_service = match_service
    self.auth_service = auth_service
    self.thread_service = thread_service

  def get(self):
    """
    Processes a HTTP GET request for the match REST API.

    :return: a Flask HTTP response with a User's current matches.
    """
    matches = self.match_service.get_current_matches()
    return jsonify(matches=matches)

  def delete(self, user_id, purge=False):
    """
    Processes a HTTP DELETE request for the match REST API.

    :return: a Flask HTTP response with a success or failure status.
    """
    remove_match = self.match_service.inactivate_match(user_id, purge)
    # Also removes the two user's thread history
    remove_thread = self.thread_service.delete_thread(user_id, purge)
    # TODO(martin): call find_match function
    return jsonify(status=remove_match and remove_thread)