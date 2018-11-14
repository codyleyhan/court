import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from './AuthStack';

export default createSwitchNavigator({
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
});
