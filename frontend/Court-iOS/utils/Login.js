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
      // TODO(river): add 'birthday' permission once app goes through review
      permissions: ['public_profile', 'email'],
      // TODO(river): change this behavior to native, or browser to eliminate weird animation
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
