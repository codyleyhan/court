import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import InboxScreen from '../screens/InboxScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: InboxScreen,
});

HomeStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: Colors.teal,
  },
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-chatbubbles'
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarOptions: {
    activeTintColor: Colors.teal,
  },
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name='md-person'
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  SettingsStack,
});
