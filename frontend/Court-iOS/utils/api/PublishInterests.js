import Network from '../../constants/Network';
import { getAuthToken } from './Authorization';

export function publishInterests(genderSelection, interests) {
  // Make api call to publish a given user's interests
  getAuthToken()
    .then((token) => {
      // Got token
      console.log(token);
      fetch(Network.base_api_url + `users?gender=${genderSelection.self}&preferred_gender=${genderSelection.other}&interests=${interests}`, {
        method: 'PUT',
        headers: new Headers({'Authorization': token}), 
        })
        .then((response) => response.json())
        .then((responseJSON) => {
          return responseJSON;
        })
        .catch((error) => {
          return null;
        })
    })
    .catch(error => {
      // Error fetching token
    });
}
