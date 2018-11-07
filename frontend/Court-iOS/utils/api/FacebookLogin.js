import Network from '../../constants/Network';

export function loginRequest(access_token) {
  // Make api call to backend to attempt login
  return fetch(Network.base_api_url + 'users/' + access_token, {method: 'POST'})
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON;
    })
    .catch((error) => {
      return null;
    })
}
