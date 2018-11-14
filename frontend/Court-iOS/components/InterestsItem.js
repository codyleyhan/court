import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        <View style={selected ? styles.selectedWrapper : styles.unselectedWrapper}>
          // Optional: add image preview here
          {imgUrl && (
            <Avatar width={40} src={imgUrl} />
          )}
          <View style={styles.textWrapper}>
            <Text style={selected ? styles.selectedTitleText : styles.unselectedTitleText}>
              {title}
            </Text>
            {description && (
              <Text style={selected ? styles.selectedDescriptionText : styles.unselectedDescriptionText}>
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
                color='#21ACA5'
                onPress={() => onRemoveInterest(id)}
              />
            </View>
          )}
        </View>
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
  onRemoveInterest: PropTypes.function,
}

const styles = StyleSheet.create({
  unselectedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  selectedWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
  },
  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  unselectedTitleText: {
    fontSize: 20,
    color: 'white',
  },
  selectedTitleText: {
    fontSize: 20,
    color: Colors.teal,
  },
  unselectedDescriptionText: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  selectedDescriptionText: {
    fontSize: 15,
    color: Colors.teal,
  }
});
