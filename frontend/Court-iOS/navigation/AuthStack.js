import React from 'react';
import { FluidNavigator } from 'react-navigation-fluid-transitions';

import LoginScreen from '../screens/LoginScreen';
import SetupScreen from '../screens/SetupScreen';
import InterestsScreen from '../screens/InterestsScreen';
import ConfirmationScreen from '../screens/ConfirmationScreen';

const AuthStack = FluidNavigator({
  Login: LoginScreen,
  Setup: SetupScreen,
  Interests: InterestsScreen,
  Confirmation: ConfirmationScreen,
});

export default AuthStack;
