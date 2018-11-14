import React from 'react';

import Mask from 'react-native-mask';
import { Image, View } from 'react-native';
import IconImage from '../components/IconImage';

export default class Avatar extends React.Component {
  render() {
    const { width, isLocal, src, color } = this.props;
    const size = width;
    return (
      <View style={{height: size, width: size}}>
        <Mask shape={'circle'} wash>
        {isLocal ? (
          <IconImage
            avatar={ src }
            size={ size }
            color={ color }
          />
          ) : (
          <Image
            style={{ width: size, height: size }}
            source={{ uri: src ? src : "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" }}
          />
          )
        }
      
        </Mask>
      </View>
    );
  }
}