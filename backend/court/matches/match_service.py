from flask import g, request

from court.users.models import User, Profile
from court.database import db
from court.errors import AuthorizationError, NotFoundError

class MatchService:
  """
  Handles all business logic for creating and managing user's matches.
  """


  def __init__(self, user_store=User, db_conn=db):
    """
    Constructs a new MatchService.

    :param user_store: ORM object to create/query users
    :type user_store: court.users.models.User
    :param db_conn: a SQLAlchemy database connection
    :type db_conn: flask_sqlalchemy.SQLAlchemy
    """
    self.user_store = user_store
    self.db = db_conn

  def get_current_matches(self):
    """
    Get matches list of user in the current context.

    :return: Match dictionary of the user in the current context, otherwise return empty
    :rtype: dict
    """
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
    matches = self.db.session.query(User).filter_by(id=g.user_id).first().profile.match_history
    active_matches = { k : v for (k, v) in matches.items() if v['active'] }
    return active_matches

  def inactivate_match(self, user_id):
    """
    Inactivates a match to and from the user in the current context and a specified user.

    :return: True
    :rtype: bool
    """
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
    match_to = self.db.session.query(User).filter_by(id=g.user_id).first().profile.match_history[user_id]
    match_to['active'] = False
    match_form = self.db.session.query(User).filter_by(id=user_id).first().profile.match_history[g.user_id]
    match_from['active'] = False
    return True

  # TODO: test & verify
  def add_match_to_profile(self, user_id):
    """
    Adds a match for the user in the current context with a specified user.
    If a match has not previously been made then return True, else False.

    :return: New match made.
    :rtype: bool
    """
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
    match_history = self.db.session.query(User).filter_by(id=g.user_id).first().profile.match_history
    if user_id in match_history.keys():
      return False
    else: # Create initial match
      match_history[user_id] = {
        'active': True,
        'percent_unlocked': 0,
        'profile': {
          'first_name': '',
          'last_name': '',
          'profile_picture': ''
          'interests': {}
        }
      }
      match_history = json.dumps(match_history)
      return True

  # TODO: test & verify
  def unlock_profile(self, user_id):
    """
    Prompted when user in the current context unlocks information about a specified user.
    Unlock profile progression is defined in the following order:
      Interests, First Name, Last Name, Profile Picture

    :return: Percent of specified user's profile unlocked.
    :rtype: int
    """
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
    matched_profile = self.db.session.query(User).filter_by(id=user_id).first().profile._asdict()
    matched_info = self.db.session.query(User).filter_by(id=g.user_id).first().profile.match_history[user_id]

    if len(matched_info['interests']) < len(matched_profile['interests']):
      interests_left = list(set(matched_profile['interests'])-set(matched_info_interests))
      selected_interest_key = interests_left[0]
      selected_interest_value = matched_profile['interests'][selected_interest_key]
      matched_info['profile']['interests'][selected_interest] = selected_interest_value
    else: # Start to unlock first_name, last_name, and profile_picture
      if len(matched_info['profile']['first_name']) == 0:
        first_name = matched_profile['first_name']
        matched_info['profile']['first_name'] = first_name
      elif len(matched_info['profile']['last_name']) == 0:
        last_name = matched_profile['last_name']
        matched_info['profile']['last_name'] = last_name
      elif len(matched_info['profile']['profile_picture']) == 0:
        profile_picture = matched_profile['profile_picture']
        matched_info['profile']['profile_picture'] = last_name
      else:
        raise NotFoundError

    unlocked_amount = len(matched_info['profile']) + \
                      len(matched_info['profile']['interests']) - 1
    total_amount = len(matched_profile['interests']) + 3
    percent_unlocked = unlocked_amount // total_amount * 100
    matched_info['percenet_unlocked'] = percent_unlocked

    return percent_unlocked
