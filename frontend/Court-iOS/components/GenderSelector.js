import React from 'react';
import PropTypes from 'prop-types';
import { Icon, LinearGradient } from 'expo';

import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

/**
* Allows a user to select their own gender, as well as the gender(s) they are seeking
*/
export default class GenderSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selfSelected: null, otherSelected: null };
  }

  genderSelected(gender) {
    this.setState({ selfSelected: gender });
    this.props.onGenderSelected(gender);
  }

  preferenceSelected(gender) {
    this.setState({ otherSelected: gender });
    this.props.onPreferenceSelected(gender);
  }

  render() {
    return (
      // Select your gender
      <View style={styles.outerView}>
        <Text style={styles.promptText}>{"I am:"}</Text>
        // Selector
        <View style={styles.selector}>
          <TouchableOpacity onPress={() => this.genderSelected('male')}>
            {this.state.selfSelected == 'male' ? (
              <LinearGradient style={styles.selected} colors={['#FA709A', '#FA709A']} start={[0, 0.5]} end={[1, 0.5]}>
                <Text style={styles.selectedText}>
                  Male
                </Text>
              </LinearGradient>
            ) : (
              <Text style={styles.unselected}>
                Male
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.genderSelected('female')}>
            {this.state.selfSelected == 'female' ? (
              <LinearGradient style={styles.selected} colors={['#FA709A', '#FA709A']} start={[0, 0.5]} end={[1, 0.5]}>
                <Text style={styles.selectedText}>
                  Female
                </Text>
              </LinearGradient>
            ) : (
              <Text style={styles.unselected}>
                Female
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {this.state.selfSelected && (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            // Select preferred gender
            <Text style={styles.promptText}>{"Looking for:"}</Text>
            // Selector
            <View style={styles.selector}>
              <TouchableOpacity onPress={() => this.preferenceSelected('male')}>
                {this.state.otherSelected == 'male' ? (
                  <LinearGradient style={styles.selected} colors={['#FA709A', '#FA709A']} start={[0, 0.5]} end={[1, 0.5]}>
                    <Text style={styles.selectedText}>
                      Males
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.unselected}>
                    Males
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.preferenceSelected('female')}>
                {this.state.otherSelected == 'female' ? (
                  <LinearGradient style={styles.selected} colors={['#FA709A', '#FA709A']} start={[0, 0.5]} end={[1, 0.5]}>
                    <Text style={styles.selectedText}>
                      Females
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.unselected}>
                    Females
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.preferenceSelected('both')}>
                {this.state.otherSelected == 'both' ? (
                  <LinearGradient style={styles.selected} colors={['#FA709A', '#FA709A']} start={[0, 0.5]} end={[1, 0.5]}>
                    <Text style={styles.selectedText}>
                      Both
                    </Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.unselected}>
                    Both
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
}

GenderSelector.propTypes = {
  /**
  * Callback function for when a user selects their own gender
  */
  onGenderSelected: PropTypes.func.isRequired,
  /**
  * Callback function for when a user selected what gender(s) they are seeking
  */
  onPreferenceSelected: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  outerView: {
    marginTop: 5,
    marginBottom: 45,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptText: {
    marginTop: 40,
    fontSize: 30,
    color: Colors.peach,
    marginBottom: 15,
    fontFamily: 'orkney-bold',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
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
    marginLeft: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.0)',
    borderRadius: 25,
    // overflow: 'hidden',
  },
  selectedText: {
    fontSize: 30,
    fontFamily: 'orkney-bold',
    color: 'white',
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  unselected: {
    borderWidth: 1,
    borderColor: Colors.peach,
    fontFamily: 'orkney-bold',
    borderRadius: 16,
    overflow: 'hidden',
    paddingTop: 8,
    paddingHorizontal: 20,
    marginLeft: 15,
    fontSize: 20,
    color: Colors.peach,
  },
});
