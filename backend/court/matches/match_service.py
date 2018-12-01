import json
from flask import g, request
from heapq import heappush, heappop

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

  def inactivate_match(self, user_id, purge=False):
    """
    Inactivates a match to and from the user in the current context and a specified user.

    Also triggers the message thread to be deleted from thread_service.

    :param user_id: user id of the match to the user in the current context
    :type user_id: int
    :param purge: optional argument to mark match inactive or delete from database
    :type purge: boolean

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

    if purge:
      del user_match_history[str(user_id)]
      del matched_user_match_history[str(g.user_id)]
    else:
      user_match_history[str(user_id)]['active'] = False
      matched_user_match_history[str(g.user_id)]['active'] = False

    setattr(user, 'match_history', user_match_history)
    setattr(matched_user, 'match_history', matched_user_match_history)
    self.db.session.commit()

    return True

  def add_match_to_profile(self, user_id, matched_interest, force=False):
    """
    Adds a match for the user in the current context with a specified user.
    If a match has not previously been made then return True, else False.

    :param user_id: user id of the match to the user in the current context
    :type user_id: int
    :param matched_interest:  one interest that the matched user and user in the current context have in common
    :type matched_interest: key value of interest in common
    :param force: optional argument to override previous match with user
    :type force: boolean

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

    if not force:
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
    self.db.session.commit()

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

    def _unlock_next_feature(from_history, to_user_id, to_dict):
      # Unlock to_user_id's features for from_{user}'s match_history
      print(type(to_dict['interests'])); print(to_dict['interests'])
      if len(from_history[str(to_user_id)]['profile']['interests']) < len(to_dict['interests']):
        # Continue unlocking interests for to_user_id user
        unlocked_interests = from_history[str(to_user_id)]['profile']['interests'].keys()
        total_interests = to_dict['interests'].keys()
        interests_left = list(set(total_interests) - set(unlocked_interests))
        selected_interest_key = interests_left[0]
        selected_interest_value = to_dict['interests'][selected_interest_key]
        from_history[str(to_user_id)]['profile']['interests'][selected_interest_key] = selected_interest_value
      else:
        # Start to unlock first_name, last_name, and profile_picture for to_user_id user
        if from_history[str(to_user_id)]['profile']['first_name'] == "":
          first_name = to_dict['first_name']
          from_history[str(to_user_id)]['profile']['first_name'] = first_name
        elif from_history[str(to_user_id)]['profile']['last_name'] == "":
          last_name = to_dict['last_name']
          from_history[str(to_user_id)]['profile']['last_name'] = last_name
        else: # from_history[str(to_user_id)]['profile']['profile_picture'] == "":
          profile_picture = to_dict['profile_picture']
          user_match_history[str(to_user_id)]['profile']['profile_picture'] = profile_picture
      return from_history[str(to_user_id)]

    user_match_history[str(user_id)] = _unlock_next_feature(
        user_match_history, str(user_id), matched_user_dict)
    matched_user_match_history[str(g.user_id)] = _unlock_next_feature(
        matched_user_match_history, str(g.user_id), user_dict)

    def _compute_unlock_percentage(from_history, to_user_id, to_dict):
      to_unlocked = len(from_history[str(to_user_id)]['profile']['interests']) + \
          (1 if from_history[str(to_user_id)]['profile']['first_name'] != "" else 0) + \
          (1 if from_history[str(to_user_id)]['profile']['last_name'] != "" else 0) + \
          (1 if from_history[str(to_user_id)]['profile']['profile_picture'] != "" else 0)
      # 3 is from first_name + last_name + profile_picture
      to_total = len(to_dict['interests']) + 3
      to_percent_unlock = int(float(to_unlocked) / to_total * 100)
      return to_percent_unlock

    user_match_history[str(user_id)]['percent_unlocked'] = _compute_unlock_percentage(
        user_match_history, str(user_id), matched_user_dict)
    matched_user_match_history[str(g.user_id)]['percent_unlocked'] = _compute_unlock_percentage(
        matched_user_match_history, str(g.user_id), user_dict)

    setattr(user, 'match_history', user_match_history)
    setattr(matched_user, 'match_history', matched_user_match_history)
    self.db.session.commit()

    return (user_match_history[str(user_id)]['percent_unlocked'],
            matched_user_match_history[str(g.user_id)]['percent_unlocked'])

  def find_match(self, user_id, num_matches):
    profiles = self.db.session.query(Profile)
    N = len(profiles.all())
    pairs = [[None for y in range(N)] for x in range(N)]
    user_ids = []
    preferences = {}
    matches = {}
    user_profile = None

    # creates a grid of number of common interests between users
    i = 0
    for profile1 in profiles.order_by(Profile.created_at):
      j = 0
      if profile1.user_id == user_id:
        user_profile = profile1
      user_ids.append(profile1.user_id)
      for profile2 in profiles.order_by(Profile.created_at):
        if pairs[j][i] != None:
          pairs[i][j] = pairs[j][i]
        elif profile1.id != profile2.id and profile1.gender == profile2.preferred_gender and \
          profile1.preferred_gender == profile2.gender:
          interests1 = set(profile1.interests.keys())
          interests2 = set(profile2.interests.keys())
          common_interests = len(interests1 & interests2)
          random_interest = ''
          if common_interests != 0:
            random_interest = (interests1 & interests2).pop()
          pairs[i][j] = (common_interests, random_interest)
        j += 1
      i += 1

    # gets num_matches for each user
    for k in range(num_matches):
      # creates a preference list for each user
      for i in range(N):
        preferences[i] = []
        for j in range(N):
          if pairs[i][j] != None:
            heappush(preferences[i], (-1 * pairs[i][j][0], j))
      # iterates through preference lists to get a match for each user
      for i in range(N):
        if user_ids[i] not in matches:
          matches[user_ids[i]] = []
        if len(matches[user_ids[i]]) < num_matches:
          while len(preferences[i]) > 0:
            match = heappop(preferences[i])
            if user_ids[match[1]] not in matches:
              matches[user_ids[match[1]]] = []
            if pairs[i][match[1]] != None and (len(matches[user_ids[match[1]]]) < num_matches or len(preferences[i]) == 0):
              matches[user_ids[i]].append((user_ids[match[1]], pairs[i][match[1]][1]))
              matches[user_ids[match[1]]].append((user_ids[i], pairs[i][match[1]][1]))
              pairs[i][match[1]] = None
              pairs[match[1]][i] = None
              break

    user_matches = map(lambda x: (x[0], { x[1] : user_profile.interests[x[1]] }), matches[user_id])

    return list(user_matches)
