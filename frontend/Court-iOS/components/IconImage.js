import React from 'react';

import Mask from 'react-native-mask';
import { Image, StyleSheet, View } from 'react-native';
import Icons from '../constants/Icons';

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
