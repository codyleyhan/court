import Network from '../../constants/Network';

export function publishInterests(genderSelection, interests) {
  // Make api call to backend to attempt login
  return fetch(Network.base_api_url + 'users', {method: 'PUT'})
    .then((response) => response.json())
    .then((responseJSON) => {
      console.log(responseJSON);
      return responseJSON;
    })
    .catch((error) => {
      return null;
    })
}
