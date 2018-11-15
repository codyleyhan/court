from court.database import db
from court.users.models import Profile
from heapq import heappush, heappop

import time
from datetime import date

class Match():
  def __init__(self):
    # maps each user id to a list of (id, common_interest) matches
    self.matches = {}

  def getMatches(self, user_id):
    return self.matches[user_id]

  def match(self):
    profiles = Profile.query
    N = len(profiles.all())
    pairs = [[None for y in range(N)] for x in range(N)]
    user_ids = []
    preferences = {}
    matches = {}

    # creates a grid of number of common interests between users
    i = 0
    for profile1 in profiles.order_by(Profile.created_at):
      j = 0
      user_ids.append(profile1.user_id)
      for profile2 in profiles.order_by(Profile.created_at):
        if pairs[j][i] != None:
          pairs[i][j] = pairs[j][i]
        elif profile1.id != profile2.id and profile1.gender == profile2.preferred_gender and profile1.preferred_gender == profile2.gender:
          interests1 = set(profile1.interests)
          interests2 = set(profile2.interests)
          common_interests = len(interests1 & interests2)
          random_interest = ''
          if common_interests != 0:
            random_interest = (interests1 & interests2).pop()
          pairs[i][j] = (common_interests, random_interest)
        j += 1
      i += 1

    # gets K matches for each user
    K = 5
    for k in range(K):
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
        if len(matches[user_ids[i]]) < K:
          while len(preferences[i]) > 0:
            match = heappop(preferences[i])
            if user_ids[match[1]] not in matches:
              matches[user_ids[match[1]]] = []
            if pairs[i][match[1]] != None and (len(matches[user_ids[match[1]]]) < K or len(preferences[i]) == 0):
              matches[user_ids[i]].append((user_ids[match[1]], pairs[i][match[1]][1]))
              matches[user_ids[match[1]]].append((user_ids[i], pairs[i][match[1]][1]))
              pairs[i][match[1]] = None
              pairs[match[1]][i] = None
              break

    self.matches = matches
    return self.matches


    '''p1 = Profile(
      id='002',
      user_id='002',
      first_name='test',
      last_name='user',
      gender='male',
      preferred_gender='male',
      _interests='[["foo", "bar"]]',
      created_at=date.fromtimestamp(time.time()),
      updated_at=date.fromtimestamp(time.time()),
      )'''
    #db.session.add(p1)

    #d = Profile.query.filter_by(id='002').first()
    #db.session.delete(d)
    #db.session.commit()





