import React from 'react';
import PropTypes from 'prop-types';

import Mask from 'react-native-mask';
import { Image, StyleSheet, View, Platform } from 'react-native';
import IconImage from './IconImage';

/**
* Displays a Circular image of specified height
*/
export default class Avatar extends React.Component {
  render() {
    const { width, imgURL, color, animalName, showSubIcon } = this.props;
    const size = width;

    let mainAvatar = null;
    if (imgURL) {
      mainAvatar = ( <Image
                        style={{ width: size, height: size }}
                        source={{ uri: imgURL }}
                     />);
    } else if (animalName && color) {
      mainAvatar = ( <IconImage
                        avatar={ animalName }
                        size={ size }
                        color={ color }
                     />);
    } else {
      mainAvatar = ( <Image
                        style={{ width: size, height: size }}
                        source={{ uri: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" }}
                     />);
    }

    let subAvatar = null;
    if (animalName && color && imgURL && showSubIcon) {
      subAvatar = ( <IconImage
                        avatar={ animalName }
                        size={ .3 * size }
                        color={ color }
                        showBorder={true}
                     />);
    }

    return (
      <View style={{height: size, width: size}}>
        <Mask shape={'circle'} wash>
        { mainAvatar }
        </Mask>

        {subAvatar && (
            <View style={[ styles.subAvatarWrapper, {height: .3 * size, width: .3 * size}]}>
            <Mask shape={'circle'} wash>
              { subAvatar }
            </Mask>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subAvatarWrapper:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: -4,
    marginBottom: -4,
  },
});

Avatar.propTypes = {
  /**
  * Specifies diameter of resulting image
  */
  width: PropTypes.number.isRequired,
  /**
  * The string uri to fetch that corrosponds to a web url
  */
  imgURL: PropTypes.string,
  /**
  * Background color of resulting image, if PNG
  */
  color: PropTypes.string,
  /**
  * The string uri to fetch corresponding to a local uri
  */
  animalName: PropTypes.string,
  /**
  * Displays the nested subicon 
  */
  showSubIcon: PropTypes.bool,
  
};
