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

    Example request:

    .. code-block:: bash

      GET localhost:8000/api/matches

    Example response:

    .. code-block:: json

      {
        "matches": {
          "2": {
            "active": true,
            "percent_unlocked": 100,
            "profile": {
              "animal": "Brown",
              "color": "Donkey",
              "gender": "Male",
              "preferred_gender": "Female",
              "first_name": "Joe",
              "last_name": "Bruin",
              "profile_picture": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=102773437400251&height=300&width=300&ext=1544820635&hash=AeQAGANVCW2xEscN",
              "interests": { "interest1": "value1" }
            }
          }
        },
        "thread_status": true
      }

    :return: a Flask HTTP response with a User's current matches and thread status.
    """
    matches = self.match_service.get_current_matches()
    # Also adds threads for matches that do not yet exist
    user = self.auth_service.get_current_user()
    threads = self.thread_service.create_threads(user, matches)
    return jsonify(matches=matches, thread_status=threads)

  def delete(self, user_id, purge=False):
    """
    Processes a HTTP DELETE request for the match REST API.

    Example request:

    .. code-block:: bash

      DELETE localhost:8000/api/matches

    Example response:

    .. code-block:: json

      {
        "status": true,
        "new_matches": 2
      }

    :param user_id: user id of the match to the user in the current context
    :type user_id: int
    :param purge: optional argument to mark match inactive or delete from database
    :type purge: boolean

    :return: a Flask HTTP response with a success or failure status, and number of new matches found.
    """
    remove_match = self.match_service.inactivate_match(user_id, purge)
    # Also removes the two user's thread history
    remove_thread = self.thread_service.delete_thread(user_id, purge)
    # Since a match was deleted, we recompute new matches
    current_user_id = self.auth_service.get_current_user_id()
    find_matches = self.match_service.find_match(current_user_id, 1)
    # Ensure threads exists for these new matches
    matches = self.match_service.get_current_matches()
    user = self.auth_service.get_current_user()
    threads = self.thread_service.create_threads(user, matches)
    return jsonify(status=remove_match and remove_thread,
                   new_matches=len(find_matches))
