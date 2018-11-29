import json
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
    matches = self.db.session.query(Profile).filter_by(user_id=g.user_id).first().match_history
    if matches is not None:
      active_matches = { k : v for (k, v) in matches.items() if v['active'] }
      return active_matches

    return {}

  def inactivate_match(self, user_id):
    """
    Inactivates a match to and from the user in the current context and a specified user.

    :param user_id: user id of the match to the user in the current context
    :type user_id: int

    :return: Whether or not a match was successfully deleted
    :rtype: bool
    """
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
    user = self.db.session.query(Profile).filter_by(user_id=g.user_id).first()
    matched_user = self.db.session.query(Profile).filter_by(user_id=user_id).first()

    user_match_history = user.match_history
    matched_user_match_history = matched_user.match_history

    if str(user_id) not in user_match_history.keys() or \
       str(g.user_id) not in matched_user_match_history.keys():
       return False

    user_match_history[str(user_id)]['active'] = False
    matched_user_match_history[str(g.user_id)]['active'] = False

    setattr(user, 'match_history', user_match_history)
    setattr(matched_user, 'match_history', matched_user_match_history)

    return True

  def add_match_to_profile(self, user_id, matched_interest):
    """
    Adds a match for the user in the current context with a specified user.
    If a match has not previously been made then return True, else False.

    :param user_id: user id of the match to the user in the current context
    :type user_id: int
    :param matched_interest:  one interest that the matched user and user in the current context have in common
    :type matched_interest: key value of interest in common

    :return: Whether a new match was successfully made
    :rtype: bool
    """
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
    user = self.db.session.query(Profile).filter_by(user_id=g.user_id).first()
    matched_user = self.db.session.query(Profile).filter_by(user_id=user_id).first()

    user_match_history = user.match_history
    matched_user_match_history = matched_user.match_history

    if str(user_id) in user.match_history.keys() or \
       str(g.user_id) in matched_user.match_history.keys():
      return False

    user_dict = user._asdict()
    matched_user_dict = matched_user._asdict()
    user_feature_unlock = int(1.0 / (len(user_dict['interests']) + 3) * 100)
    matched_user_feature_unlock = int(1.0 / (len(matched_user_dict['interests']) + 3) * 100)

    user_match_history[str(user_id)] = {
      'active': True,
      'percent_unlocked': matched_user_feature_unlock,
      'profile': {
        'animal': matched_user_dict['animal'],
        'color': matched_user_dict['color'],
        'gender': matched_user_dict['gender'],
        'preferred_gender': matched_user_dict['preferred_gender'],
        'first_name': '',
        'last_name': '',
        'profile_picture': '',
        'interests': matched_interest
      }
    }
    matched_user_match_history[str(g.user_id)] = {
      'active': True,
      'percent_unlocked': user_feature_unlock,
      'profile': {
        'animal': user_dict['animal'],
        'color': user_dict['color'],
        'gender': user_dict['gender'],
        'preferred_gender': user_dict['preferred_gender'],
        'first_name': '',
        'last_name': '',
        'profile_picture': '',
        'interests': matched_interest
      }
    }

    setattr(user, 'match_history', user_match_history)
    setattr(matched_user, 'match_history', matched_user_match_history)

    return True

  def unlock_next_profile_feature(self, user_id):
    """
    Prompted when user in the current context unlocks information about a specified user
    to unlock the next profile feature.
    Unlock profile progression is defined in the following order:
      Interests, First Name, Last Name, Profile Picture

    :param user_id: user id of the match to the user in the current context
    :type user_id: int

    :return: Tuple of percents of specified user's profile unlocked and current context user's profile unlocked respectively.
    :rtype: tuple(int, int)
    :raises: RuntimeError
    """
    if 'user_id' in g:
      user = self.user_store.query.get(g.user_id)
      g.user = user
    user = self.db.session.query(Profile).filter_by(user_id=g.user_id).first()
    matched_user = self.db.session.query(Profile).filter_by(user_id=user_id).first()

    user_match_history = user.match_history
    matched_user_match_history = matched_user.match_history

    if str(user_id) not in user.match_history.keys() or \
       str(g.user_id) not in matched_user.match_history.keys():
      raise RuntimeError()

    user_dict = user._asdict()
    matched_user_dict = matched_user._asdict()

    # Unlock matched_user features for current user's match_history
    if len(user_match_history[str(user_id)]['profile']['interests']) < len(matched_user_dict['interests']):
      # Continue unlocking interests for matched_user
      unlocked_interests = user_match_history[str(user_id)]['profile']['interests'].keys()
      total_interests = matched_user_dict['interests'].keys()
      interests_left = list(set(total_interests) - set(unlocked_interests))
      selected_interest_key = interests_left[0]
      selected_interest_value = matched_user_dict['interests'][selected_interest_key]
      user_match_history[str(user_id)]['profile']['interests'][selected_interest_key] = selected_interest_value
    else:
      # Start to unlock first_name, last_name, and profile_picture for matched_user
      if user_match_history[str(user_id)]['profile']['first_name'] == "":
        first_name = matched_user_dict['first_name']
        user_match_history[str(user_id)]['profile']['first_name'] = first_name
      elif user_match_history[str(user_id)]['profile']['last_name'] == "":
        last_name = matched_user_dict['last_name']
        user_match_history[str(user_id)]['profile']['last_name'] = last_name
      else: # user_match_history[str(user_id)]['profile']['profile_picture'] == "":
        profile_picture = matched_user_dict['profile_picture']
        user_match_history[str(user_id)]['profile']['profile_picture'] = profile_picture

    # Unlock current user features for matched_user's match_history
    if len(matched_user_match_history[str(g.user_id)]['profile']['interests']) < len(user_dict['interests']):
      # Continue unlocking interests for current user
      unlocked_interests = matched_user_match_history[str(g.user_id)]['profile']['interests'].keys()
      total_interests = user_dict['interests'].keys()
      interests_left = list(set(total_interests) - set(unlocked_interests))
      selected_interest_key = interests_left[0]
      selected_interest_value = user_dict['interests'][selected_interest_key]
      matched_user_match_history[str(g.user_id)]['profile']['interests'][selected_interest_key] = selected_interest_value
    else:
      # Start to unlock first_name, last_name, and profile_picture for current user
      if matched_user_match_history[str(g.user_id)]['profile']['first_name'] == "":
        first_name = user_dict['first_name']
        matched_user_match_history[str(g.user_id)]['profile']['first_name'] = first_name
      elif matched_user_match_history[str(g.user_id)]['profile']['last_name'] == "":
        last_name = user_dict['last_name']
        matched_user_match_history[str(g.user_id)]['profile']['last_name'] = last_name
      else: # matched_user_match_history[str(g.user_id)]['profile']['profile_picture'] == "":
        profile_picture = user_dict['profile_picture']
        matched_user_match_history[str(g.user_id)]['profile']['profile_picture'] = profile_picture

    # Compute unlocked percentage of matched_user
    matched_user_unlocked = len(user_match_history[str(user_id)]['profile']['interests']) + \
        (1 if user_match_history[str(user_id)]['profile']['first_name'] != "" else 0) + \
        (1 if user_match_history[str(user_id)]['profile']['last_name'] != "" else 0) + \
        (1 if user_match_history[str(user_id)]['profile']['profile_picture'] != "" else 0)
    matched_user_total = len(matched_user_dict['interests']) + 3
    matched_user_percent_unlock = int(float(matched_user_unlocked) / matched_user_total * 100)
    user_match_history[str(user_id)]['percent_unlocked'] = matched_user_percent_unlock

    # Compute unlocked percentage of current user
    user_unlocked = len(matched_user_match_history[str(g.user_id)]['profile']['interests']) + \
        (1 if matched_user_match_history[str(g.user_id)]['profile']['first_name'] != "" else 0) + \
        (1 if matched_user_match_history[str(g.user_id)]['profile']['last_name'] != "" else 0) + \
        (1 if matched_user_match_history[str(g.user_id)]['profile']['profile_picture'] != "" else 0)
    user_total = len(user_dict['interests']) + 3
    user_percent_unlock = int(float(user_unlocked) / user_total * 100)
    matched_user_match_history[str(g.user_id)]['percent_unlocked'] = user_percent_unlock

    setattr(user, 'match_history', user_match_history)
    setattr(matched_user, 'match_history', matched_user_match_history)

    return (matched_user_percent_unlock, user_percent_unlock)
