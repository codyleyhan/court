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
    const { size, avatar, color } = this.props;
    return (
      <View style={{height: size, width: size, backgroundColor: color, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{ width: .6 * size, height: .6 * size, tintColor: 'white' }}
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