import Network from '../../constants/Network';
import { getAuthToken } from './Authorization';

export async function getThreads() {
  // Make api call to fetch a user's current chat threads
  return getAuthToken()
    .then((token) => {
      // Got token
      if (token == null) {
        alert('Null token in API call');
        return;
      }
      return fetch(Network.base_api_url + 'threads', {
        method: 'GET',
        headers: new Headers({'Authorization': token}),
        })
        .then((response) => response.json())
        .then((responseJSON) => {
          return responseJSON;
        })
        .catch((error) => {
          // Error in publishing
          return null;
        })
    })
    .catch(error => {
      // Error fetching token
      return null;
    });
}

export async function getMessages(thread_id) {
  // Make api call to fetch a user's messages in a specific thread
  return getAuthToken()
    .then((token) => {
      if (token == null) {
        alert('Null token in API call')
        return;
      }
      // Got token
      return fetch(Network.base_api_url + `threads/${thread_id}/messages`, {
        method: 'GET',
        headers: new Headers({'Authorization': token}),
        })
        .then((response) => response.json())
        .then((responseJSON) => {
          return responseJSON;
        })
        .catch((error) => {
          // Error in publishing
          return null;
        })
    })
    .catch(error => {
      // Error fetching token
      return null;
    });
}
