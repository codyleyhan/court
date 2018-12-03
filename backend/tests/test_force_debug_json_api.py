import json

import pytest

from .shared import token_for_user_1, token_for_user_2, token_for_user_3

def test_force_match(app):
  with app.test_client() as client:
    # testing that user 1 has 1 match and the thread exists
    resp = client.get('/api/matches', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['matches']) == 1
    assert '2' in data['matches'].keys()
    assert data['matches']['2']['active'] == True
    assert data['thread_status'] == True

    # prove that thread exists
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 1
    assert data['threads'][0]['is_active']
    assert len(data['threads'][0]['users']) == 2

    # testing that we can force a match with user 4
    resp = client.get('/api/force_match/4', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert data['success'] == True

    # testing that user 1 now has 2 matches
    resp = client.get('/api/matches', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['matches']) == 2
    assert '2' in data['matches'].keys() and '4' in data['matches'].keys()
    assert data['matches']['4']['active'] == True
    assert data['thread_status'] == True

    # prove that thread to user 4 exists
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 2
    assert data['threads'][0]['is_active'] and data['threads'][1]['is_active']
    assert len(data['threads'][0]['users']) == 2 and len(data['threads'][1]['users']) == 2

def test_force_match_delete(app):
  with app.test_client() as client:
    # testing that user 1 has 1 match and the thread exists
    resp = client.get('/api/matches', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['matches']) == 1
    assert '2' in data['matches'].keys()
    assert data['matches']['2']['active'] == True
    assert data['thread_status'] == True

    # prove that thread exists
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 1
    assert data['threads'][0]['is_active']
    assert len(data['threads'][0]['users']) == 2

    # testing that we can force delete a match with user 2
    resp = client.get('/api/force_match_delete/2', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert data['status'] == True

def test_force_unlock(app):
  with app.test_client() as client:
    # testing that user 1 has 1 match and the thread exists
    resp = client.get('/api/matches', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['matches']) == 1
    assert '2' in data['matches'].keys()
    assert data['matches']['2']['active'] == True
    assert data['thread_status'] == True
    old_match = data['matches']['2']

    # testing that we can force unlock the next profile feature
    resp = client.get('/api/force_unlock/2', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    mock_progess = {
      'progress': {
        'matched_user_percent_unlocked': 25,
        'matched_user_unlocked_feature': {'interest2': 'value2'},
        'user_percent_unlocked': 25,
        'user_unlocked_feature': {'interest1': 'value1'}
      }
    }
    assert data == mock_progess

    # prove that we have unlocked a new feature for user 2
    resp = client.get('/api/matches', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['matches']) == 1
    assert '2' in data['matches'].keys()
    new_match = data['matches']['2']

    assert old_match != new_match
