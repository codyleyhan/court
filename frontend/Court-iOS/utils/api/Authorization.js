import { AsyncStorage } from 'react-native';

import Authentication from '../../constants/Authentication';

export function getAuthToken() {
  // Fetches the set auth token, returns a JWT to pass as a header
  return AsyncStorage.getItem(Authentication.AUTH_TOKEN);
}
