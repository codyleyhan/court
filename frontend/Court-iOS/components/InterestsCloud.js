import React from 'react';
import { Icon } from 'expo';

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

import InterestsItem from '../components/InterestsItem';

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

const styles = StyleSheet.create({
  outerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
  },
});
