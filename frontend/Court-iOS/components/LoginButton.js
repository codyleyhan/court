import React from 'react';
import PropTypes from 'prop-types';
import { Icon, LinearGradient } from 'expo';

import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

import { RegularText } from './StyledText';


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
        color='white'
      />
    );

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <LinearGradient colors={['#21BFAE', '#80D0C7']} start={[0,0.25]} end={[0.7,0.5]} style={styles.loginButton}>
          {showLogo && fbIcon}
          <Text style={styles.loginText}>{ text }</Text>
        </LinearGradient>
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
    borderRadius: 30,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    paddingTop: 6,
    fontFamily: 'orkney-medium',
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
  showLogo: PropTypes.bool,
  /**
  * Text to be rendered in button
  */
  text: PropTypes.string.isRequired,
}
