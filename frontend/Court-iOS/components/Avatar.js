import React from 'react';
import PropTypes from 'prop-types';

import Mask from 'react-native-mask';
import { Image, View } from 'react-native';
import IconImage from '../components/IconImage';

/**
* Displays a Circular image of specified height
*/
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

Avatar.propTypes = {
  /**
  * Specifies diameter of resulting image
  */
  width: PropTypes.number.isRequired,
  /**
  * Flag to specify loading local image
  */
  isLocal: PropTypes.bool,
  /**
  * The string uri to fetch, either a web url, or local uri
  */
  src: PropTypes.string,
  /**
  * Background color of resulting image, if PNG
  */
  color: PropTypes.string,
}
