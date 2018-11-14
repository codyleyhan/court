import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import { TouchableOpacity, View } from 'react-native';

import Colors from '../constants/Colors';

/**
* Used for returning to previous screen
*/
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

BackButton.propTypes = {
  /**
  * Stack of previously viewed screens
  */
  navigation: PropTypes.instanceOf(StackNavigator).isRequired,
}