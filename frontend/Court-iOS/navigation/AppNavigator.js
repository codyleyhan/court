import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';

import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator({
  Login: LoginScreen,
});

export default createSwitchNavigator({
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
});
