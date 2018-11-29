import Network from '../../constants/Network';
import { getAuthToken } from './Authorization';

export async function publishInterests(genderSelection, interests, color, animal) {
  // Make api call to publish a given user's interests
  return getAuthToken()
    .then((token) => {
      // Got token
      return fetch(Network.base_api_url + `users?gender=${genderSelection.self}&preferred_gender=${genderSelection.other}&interests=${JSON.stringify(interests)}&color=${color}&animal=${animal}`, {
        method: 'PUT',
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
