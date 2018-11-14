import React from 'react';
import { Icon } from 'expo';

import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';

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
            <Text style={this.state.selfSelected == 'male' ? styles.selected : styles.unselected}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.genderSelected('female')}>
            <Text style={this.state.selfSelected == 'female' ? styles.selected : styles.unselected}>
              Female
            </Text>
          </TouchableOpacity>
        </View>

        {this.state.selfSelected && (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            // Select preferred gender
            <Text style={styles.promptText}>{"Looking for:"}</Text>
            // Selector
            <View style={styles.selector}>
              <TouchableOpacity onPress={() => this.preferenceSelected('male')}>
                <Text style={this.state.otherSelected == 'male' ? styles.selected : styles.unselected}>
                  Males
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.preferenceSelected('female')}>
                <Text style={this.state.otherSelected == 'female' ? styles.selected : styles.unselected}>
                  Females
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.preferenceSelected('both')}>
                <Text style={this.state.otherSelected == 'both' ? styles.selected : styles.unselected}>
                  Both
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  }
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
    color: 'white',
    marginBottom: 15,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    marginLeft: 15,
    fontSize: 30,
    color: Colors.teal,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
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
  },
  unselected: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 5,
    marginLeft: 15,
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
