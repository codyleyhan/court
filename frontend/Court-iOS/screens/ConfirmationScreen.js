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
    this.props.navigation.navigate('Auth');
  }

  render() {
    const user = this.props.navigation.getParam('user', null);
    const user_name = user.first_name;
    const profile_url = user.picture.data.url;

    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        <Transition appear="horizontal" shared="avatar">
          <View style={{height: 100, width: 100, marginBottom: 15, marginTop: 80}}>
            <Mask shape={'circle'}>
              <Image
                style={styles.userImage}
                source={{ uri: profile_url }}
              />
            </Mask>
          </View>
        </Transition>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Transition appear="horizontal">
            <Text style={styles.welcomeText}>{`Congrats ${user_name}!`}</Text>
          </Transition>
          <Transition appear="horizontal">
            <Text style={styles.subText}>{'Your account is all set up'}</Text>
          </Transition>
        </View>
        <View style={styles.continueButton}>
          <TouchableOpacity onPress={() => this.goNext(user)} activeOpacity={0.75}>
            <Text style={styles.continueText}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
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
  interestsListWrapper: {
    maxHeight: 50,
  },
  interestsList: {
    // backgroundColor: 'green',
  },
  continueButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 25,
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
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: 'white',
  },
  subText: {
    fontSize: 20,
    color: 'white',
  }
});
