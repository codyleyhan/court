import React from 'react';
import PropTypes from 'prop-types';

import Mask from 'react-native-mask';
import { Image, StyleSheet, View } from 'react-native';
import Icons from '../constants/Icons';

/**
* Used for loading predefined static images
*/
export default class IconImage extends React.Component {
  render() {
    const { size, avatar, color, showBorder } = this.props;
    const borderRadius = .5 * size;
    const dimension = .6 * size;
    const borderStyle = showBorder ? {borderRadius: borderRadius, borderWidth: 3, borderColor: 'white'} : {};
    return (
      <View style={[{height: size, width: size, backgroundColor: color, justifyContent: 'center', alignItems: 'center'}, borderStyle]}>
        <Image
          style={{ width: dimension, height: dimension, tintColor: 'white' }}
          source={ Icons[avatar] }
        />
      </View>
    );
  }
}

IconImage.propTypes = {
	/**
	* Specifies width and height of avatar image
	*/
	size: PropTypes.number.isRequired,
	/**
	* The avatar name to fetch
	*/
	avatar: PropTypes.string.isRequired,
	/**
	* Background color of avatar
	*/
	color: PropTypes.string.isRequired,
}
