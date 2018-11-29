import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Mask from 'react-native-mask';
import Colors from '../constants/Colors';

import BackButton from './BackButton';


/**
* Creates header with centered text, and optional left and right components
*/
export default class Header extends React.Component {
  render() {
    const { color, text, navigation, rightIcon, showBack } = this.props;
    const styleColor = color ? color : Colors.teal;
    const backButton = (
      <TouchableOpacity onPress={() => navigation.pop()}>
        <Mask shape={'circle'}>
          <View style={{width: 40, height: 40, backgroundColor: styleColor, alignItems: 'center', paddingRight: 3}}>
            <Icon.Ionicons
              name='ios-arrow-back'
              size={40}
              color='white'
            />
          </View>
        </Mask>
      </TouchableOpacity>
  );

    return (
      <View style={[styles.headerContainer, {borderBottomColor: styleColor}]}>
        {showBack && backButton}
        <Text style={[styles.headerTitle, {color: styleColor}]}>{text}</Text>
        {rightIcon}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontFamily: 'orkney-medium',
    paddingTop: 10,
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
  }
});

Header.propTypes = {
  /**
  * Specifies header color 
  */
  color: PropTypes.string,
  /**
  * Text to be rendered in center of header
  */
  text: PropTypes.string.isRequired,
  /**
  * Stack of previously viewed screens - required when showBack == True
  */
  navigation: PropTypes.object,
  /**
  * Component to be rendered on left side of header
  */
  rightIcon: PropTypes.node,
  /**
  * Component to be rendered on right side of header
  */
  leftIcon: PropTypes.node,
  /**
  * Displays the back icon on the left side of the component
  */
  showBack: PropTypes.bool,
}
