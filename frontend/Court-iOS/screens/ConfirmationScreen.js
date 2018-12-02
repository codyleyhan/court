import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { Haptic } from 'expo';

import { Transition } from 'react-navigation-fluid-transitions';
import Mask from 'react-native-mask';

import Colors from '../constants/Colors';

import LoginButton from '../components/LoginButton';
import BackButton from '../components/BackButton';

export default class ConfirmationScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  goNext() {
    Haptic.impact('light');
    this.props.navigation.navigate('App');
  }

  render() {
    const user = this.props.navigation.getParam('user', null);
    const user_name = user.first_name;
    const profile_url = user.profile_picture;

    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        <View style={{height: 100, width: 100, marginBottom: 15, marginTop: 80}}>
          <Mask shape={'circle'}>
            <Image
              style={styles.userImage}
              source={{ uri: profile_url }}
            />
          </Mask>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Transition appear="horizontal">
            <Text style={styles.welcomeText}>{`Congrats ${user_name}!`}</Text>
          </Transition>
          <Transition appear="horizontal">
            <Text style={styles.subText}>{'Your account is all set up'}</Text>
          </Transition>
        </View>
        // Animation
        <LottieView
          source={require('../assets/animations/checked_done.json')}
          autoPlay
          speed={0.5}
          loop={false}
          style={styles.animation}
        />

        <View style={styles.continueButton}>
          <LoginButton text="Go to Inbox" onPress={() => this.goNext()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
  },
  continueButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 25,
  },
  continueText: {
    fontSize: 20,
    color: Colors.teal,
  },
  userImage: {
    width: 100,
    height: 100,
  },
  welcomeText: {
    fontSize: 40,
    color: Colors.teal,
    fontFamily: 'orkney-medium',
  },
  subText: {
    fontSize: 20,
    color: Colors.teal,
    fontFamily: 'orkney-regular',
  },
  animation: {
    height: 500,
    width: 500,
  }
});
