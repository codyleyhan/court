import React from 'react';
import {
  AsyncStorage,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Transition } from 'react-navigation-fluid-transitions';
import Mask from 'react-native-mask';

import Authentication from '../constants/Authentication';
import Colors from '../constants/Colors';

import GenderSelector from '../components/GenderSelector';
import LoginButton from '../components/LoginButton';
import BackButton from '../components/BackButton';

export default class SetupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { gender: null, preferred: null };
  }

  handleGenderSelection = (gender) => {
    this.setState({ gender: gender });
  }

  handlePreferenceSelection = (preference) => {
    this.setState({ preferred: preference });
  }

  handleContinueClick = (user) => {
    // Navigate to next screen, and submit user selections to API
    // TODO(river): submit these details to the backend
    this.props.navigation.navigate('Interests', { user: user });
  }

  render() {
    const user = this.props.navigation.getParam('user', null);
    const user_name = user.first_name;
    const profile_url = user.picture.data.url;
    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        // White Logo Small Display
        <Transition shared="logo">
          <Image
            style={styles.logoImage}
            source={ require('../assets/images/court-logo-white.png') }
          />
        </Transition>
        // Welcome Text and user profile
        <Transition appear="horizontal" shared="avatar">
          <View style={{height: 100, width: 100, marginBottom: 15}}>
            <Mask shape={'circle'}>
              <Image
                style={styles.userImage}
                source={{ uri: profile_url }}
              />
            </Mask>
          </View>
        </Transition>
        <Transition appear="horizontal">
          <Text style={styles.welcomeText}>{`Welcome ${user_name}!`}</Text>
        </Transition>
        <Transition appear="horizontal">
          <Text style={styles.subText}>{`Let's get your account set up...`}</Text>
        </Transition>
        <Transition appear="horizontal">
          <GenderSelector onGenderSelected={this.handleGenderSelection} onPreferenceSelected={this.handlePreferenceSelection}/>
        </Transition>
        {(this.state.preferred && this.state.gender) && (
            <LoginButton text="Continue" onPress={() => this.handleContinueClick(user)} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.teal,
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
    marginTop: 80,
    marginBottom: 50,
  },
  userImage: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 40,
    color: 'white',
  },
  subText: {
    fontSize: 20,
    color: 'white',
  }
});
