import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

import InterestsItem from '../components/InterestsItem';

/**
* Displays a 'cloud' of interests in a flex box
*/
export default class InterestsCloud extends React.Component {
  render() {
    const { interests, onAddInterest, onRemoveInterest, recommendations } = this.props;

    return (
      // Scroll View encompasing the results
      <View style={styles.outerView}>
        {recommendations.map(function(item, index) {
          return (
            <View key={index}>
              <InterestsItem
                id={item.id}
                showRemoveIcon={false}
                selected={item.id in interests}
                title={item.title}
                description={item.description}
                imgUrl={item.imgUrl}
                onAddInterest={onAddInterest}
                onRemoveInterest={onRemoveInterest}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

InterestsCloud.propTypes = {
  /**
  * Object containing the user's current selected interests
  */
  interests: PropTypes.object.isRequired,
  /**
  * Callback function for when a user selects a new interest
  */
  onAddInterest: PropTypes.func.isRequired,
  /**
  * Callback function for when a user removes an interest
  */
  onRemoveInterest: PropTypes.func.isRequired,
  /**
  * List of recommended interests given a specific search
  */
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
}

const styles = StyleSheet.create({
  outerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 15,
  },
});
