import React from 'react';
import { Icon } from 'expo';

import { TouchableOpacity, View } from 'react-native';

import Colors from '../constants/Colors';

export default class BackButton extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ position: 'absolute', top: 80, left: 20 }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon.Ionicons
            name='ios-arrow-back'
            size={40}
            color='white'
          />
        </TouchableOpacity>
      </View>
    );
  }
}
