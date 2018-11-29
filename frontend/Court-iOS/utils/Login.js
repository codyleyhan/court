import { loginRequest } from './api/FacebookLogin';

export async function logInWithFacebook() {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Expo.Facebook.logInWithReadPermissionsAsync('298139424131898', {
      permissions: ['public_profile', 'email'],
      behavior: 'web',
    });
    if (type === 'success') {
      console.log('Token: '+token);
      // Pass token to backend to complete login
      const loginResult = await loginRequest(token);
      return loginResult;
    } else {
      // type === 'cancel'
      console.log('Login cancelled');
      return null;
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
    return null;
  }
}
