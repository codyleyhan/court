import json

from .shared import token_for_user_1, token_for_user_2, token_for_user_3

def test_get_threads(app):
  with app.test_client() as client:
    # testing that user 1 has 1 thread
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 1
    assert data['threads'][0]['is_active']
    assert len(data['threads'][0]['users']) == 2

    # testing that user 2 has 1 thread
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_2})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 1
    assert data['threads'][0]['is_active']
    assert len(data['threads'][0]['users']) == 2

    # testing that user 3 has no threads
    resp = client.get('/api/threads', headers={'Authorization': token_for_user_3})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['threads']) == 0

def test_get_thread_messages(app):
  with app.test_client() as client:
    resp = client.get('/api/threads/1/messages', headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['messages']) == 2
    assert data['messages'][0]['body'] == 'newest message'
    assert data['messages'][0]['user_id'] == 2
    assert data['messages'][1]['body'] == 'oldest message'
    assert data['messages'][1]['user_id'] == 1

    # testing that a user not in the thread gets an error
    resp = client.get('/api/threads/1/messages', headers={'Authorization': token_for_user_3})
    data = json.loads(resp.data)
    assert resp.status_code == 401
    assert 'threads' not in data
    assert not data['success']
    assert data['error'] == 'Not authorized'

def test_get_thread_messages_pagination(app):
  with app.test_client() as client:
    params = { 'first': '1'}
    resp = client.get('/api/threads/1/messages', query_string=params, headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['messages']) == 1
    assert data['messages'][0]['body'] == 'newest message'
    assert data['messages'][0]['user_id'] == 2

    # check for pagination into the past
    params = { 'before_id': '2'}
    resp = client.get('/api/threads/1/messages', query_string=params, headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['messages']) == 1

    # check for pagination into the future
    params = { 'after_id': '1'}
    resp = client.get('/api/threads/1/messages', query_string=params, headers={'Authorization': token_for_user_1})
    data = json.loads(resp.data)
    assert resp.status_code == 200
    assert len(data['messages']) == 1