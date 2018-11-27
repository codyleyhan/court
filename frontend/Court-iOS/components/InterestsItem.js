import React from 'react';
import PropTypes from 'prop-types';
import { Icon, LinearGradient } from 'expo';

import {  Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

import Avatar from '../components/Avatar';

/**
* Displays a singular interest with title, description, and image
*/
export default class InterestsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }

  toggleSelected() {
    const { id, imgUrl, title, description, onAddInterest, onRemoveInterest } = this.props;
    const oldState = this.state;
    if (oldState.selected) {
      // Remove item
      onRemoveInterest(id);
    } else {
      // Add item
      onAddInterest(id, {title: title, description: description, imgUrl: imgUrl});
    }
    this.setState({ selected: !oldState.selected });
  }

  render() {
    const {
      id,
      imgUrl,
      disableSelect,
      showRemoveIcon,
      title,
      description,
      onRemoveInterest,
    } = this.props;

    const { selected } = this.state;

    return (
      <TouchableOpacity onPress={disableSelect ? null : this.toggleSelected.bind(this)} activeOpacity={0.75}>
        {selected ? (
          <LinearGradient style={showRemoveIcon ? styles.topSelectedWrapper : styles.selectedWrapper} colors={['#FA709A', '#FA709A']} start={[0, 0.5]} end={[1, 0.5]}>
            // Optional: add image preview here
            {imgUrl && (
              <Avatar width={40} src={imgUrl} />
            )}
            <View style={styles.textWrapper}>
              <Text style={styles.selectedTitleText}>
                {title}
              </Text>
              {description && (
                <Text style={styles.selectedDescriptionText}>
                  {description}
                </Text>
              )}
            </View>
            {showRemoveIcon && (
              // icon to remove interest item
              <View style={{marginLeft: 8, paddingTop: 1}}>
                <Icon.Ionicons
                  name='md-close'
                  size={25}
                  color='white'
                  onPress={() => onRemoveInterest(id)}
                />
              </View>
            )}
          </LinearGradient>
        ) : (
          <View style={styles.unselectedWrapper}>
            // Optional: add image preview here
            {imgUrl && (
              <Avatar width={40} src={imgUrl} />
            )}
            <View style={styles.textWrapper}>
              <Text style={styles.unselectedTitleText}>
                {title}
              </Text>
              {description && (
                <Text style={styles.unselectedDescriptionText}>
                  {description}
                </Text>
              )}
            </View>
            {showRemoveIcon && (
              // icon to remove interest item
              <View style={{marginLeft: 8, paddingTop: 1}}>
                <Icon.Ionicons
                  name='md-close'
                  size={25}
                  color='white'
                  onPress={() => onRemoveInterest(id)}
                />
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

InterestsItem.propTypes = {
  /**
  * Unique identifier for the given interest (from Google KGS)
  */
  id: PropTypes.string.isRequired,
  /**
  * URL for the interest's image preview
  */
  imgUrl: PropTypes.string,
  /**
  * Disables the onPress handler for pressing the interest
  */
  disableSelect: PropTypes.bool,
  /**
  * Displays an dismiss icon on the right of the component
  */
  showRemoveIcon: PropTypes.bool,
  /**
  * Title of the interest
  */
  title: PropTypes.string.isRequired,
  /**
  * Description of the interest
  */
  description: PropTypes.string,
  /**
  * Callback for removing a given interest (used in onPress handler for the removeIcon)
  */
  onRemoveInterest: PropTypes.func,
}

const styles = StyleSheet.create({
  unselectedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.peach,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  topSelectedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(255, 255, 255, 0.0)',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  selectedWrapper: {
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(255, 255, 255, 0.0)',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  unselectedTitleText: {
    fontSize: 20,
    color: Colors.peach,
  },
  selectedTitleText: {
    fontSize: 20,
    color: 'white',
  },
  unselectedDescriptionText: {
    fontSize: 15,
    color: 'rgba(247, 163, 138, 0.8)',
  },
  selectedDescriptionText: {
    fontSize: 15,
    color: 'white',
  }
});
