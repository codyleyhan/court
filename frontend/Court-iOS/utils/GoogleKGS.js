import Network from '../constants/Network';

export function queryGoogleKG(query) {
  // Make api call to fetch knowldege graph search, and format correctly
  return fetch(Network.google_kgs_url + query.replace('/ /gi', '+') + Network.google_kgs_key)
    .then((response) => response.json())
    .then((responseJSON) => {
      return responseJSON.itemListElement;
    })
    .catch((error) => {
      return null;
    })
}
