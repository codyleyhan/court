import React from 'react';

import Mask from 'react-native-mask';
import { Image, View } from 'react-native';
import Colors from '../constants/Colors';

export default class Avatar extends React.Component {
  render() {
    const size = this.props.width;
    return (
      <View style={{height: size, width: size}}>
        <Mask shape={'circle'} wash>
          <Image
            style={{ width: size, height: size }}
            source={{ uri: this.props.src ? this.props.src : "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" }}
          />
        </Mask>
      </View>
    );
  }
}
