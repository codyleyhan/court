import Network from '../../constants/Network';
import { getAuthToken } from './Authorization';

export async function getMatches() {
  // Make api call to fetch a user's matches
  return getAuthToken()
    .then((token) => {
      // Got token
      return fetch(Network.base_api_url + 'matches', {
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

export async function deleteMatch(user_id) {
  // Make api call to fetch a user's matches
  return getAuthToken()
    .then((token) => {
      // Got token
      return fetch(Network.base_api_url + `matches/${user_id}`, {
        method: 'DELETE',
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
