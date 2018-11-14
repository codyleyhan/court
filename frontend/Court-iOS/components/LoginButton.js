import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';


/**
* Button that initiates facebook user authentication flow
*/
export default class LoginButton extends React.Component {
  render() {
    const { onPress, showLogo, text } = this.props;

    const fbIcon = (
      <Icon.Ionicons
        name="logo-facebook"
        size={30}
        style={{ marginRight: 15 }}
        color={Colors.teal}
      />
    );

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <View style={styles.loginButton}>
          {showLogo && fbIcon}
          <Text style={styles.loginText}>{ text }</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  loginButton: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 9,
      },
      android: {
        elevation: 20,
      },
    }),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: Colors.teal,
    fontSize: 20,
  }
});

LoginButton.propTypes = {
  /**
  * Function that handles touch event
  */
  onPress: PropTypes.func.isRequired,
  /**
  * Boolean indicating whether or not to show the facebook logo
  */
  showLogo: PropTypes.bool.isRequired,
  /**
  * Text to be rendered in button
  */
  text: PropTypes.string.isRequired,
}
