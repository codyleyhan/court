import json

import pytest

from .shared import token_for_user_1, token_for_user_2, token_for_user_3

def test_get_matches(app):
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

def test_delete_match(app):
  with app.test_client() as client:
    # testing that user 1 has 1 match and the thread exists
    resp = client.get('/api/matches', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['matches']) == 1
    assert '2' in data['matches'].keys()
    assert data['matches']['2']['active'] == True
    assert data['thread_status'] == True

    # delete match to user 2 (and thread by extension)
    resp = client.delete('/api/matches/2', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert data['status'] == True
    assert data['new_matches'] == 1

    # prove that thread to user 2 no longer exists
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 1
    assert 2 not in [ user['id'] for user in data['threads'][0]['users'] ]

    # prove that user 1 does not have match to user 2
    # NOTE: user 1 has a new match to user 3
    resp = client.get('/api/matches', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['matches']) == 1
    assert '3' in data['matches'].keys()
    assert '2' not in data['matches'].keys()
    assert data['matches']['3']['active'] == True
    assert data['thread_status'] == True

    # prove that new thread to user 3 exists
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 1
    assert 3 in [ user['id'] for user in data['threads'][0]['users'] ]

