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
import InterestsFinder from '../components/InterestsFinder';
import InterestsItem from '../components/InterestsItem';

export default class InterestsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.removeInterest = this.removeInterest.bind(this);
    this.state = { interests: {} };
  }

  addInterest(id, interest) {
    let interests = this.state.interests;
    interests[id] = interest;
    this.setState({ interests });
  }

  removeInterest = (id) => {
    let interests = this.state.interests;
    delete interests[id];
    this.setState({ interests });
  }

  goNext(user) {
    // Publish interests to API, navigate to next page
    // TODO(rivmist): update the backend with these changes
    this.props.navigation.navigate('Confirmation', {user: user});
  }

  render() {
    const { interests } = this.state;
    const user = this.props.navigation.getParam('user', null);
    const user_name = user.first_name;
    const profile_url = user.picture.data.url;
    const remove = this.removeInterest.bind(this);
    return (
      <View style={styles.container}>
        <BackButton navigation={this.props.navigation} />
        <Transition shared="avatar">
          <View style={{height: 100, width: 100, marginBottom: 15, marginTop: 80}}>
            <Mask shape={'circle'}>
              <Image
                style={styles.userImage}
                source={{ uri: profile_url }}
              />
            </Mask>
          </View>
        </Transition>
        {Object.keys(interests).length > 0 ? (
          <View style={styles.interestsListWrapper}>
            <ScrollView
              horizontal={true}
              style={styles.interestsList}
            >
              // Put selected interests here
              {Object.keys(interests).map(function(key) {
                return (
                  <View key={key}>
                    <InterestsItem
                      id={key}
                      disableSelect={true}
                      title={interests[key].title}
                      onRemoveInterest={remove}
                      selected={true}
                      showRemoveIcon={true}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Transition appear="horizontal">
              <Text style={styles.welcomeText}>{"Set up your interests"}</Text>
            </Transition>
            <Transition appear="horizontal">
              <Text style={styles.subText}>{'These help us to find you matches'}</Text>
            </Transition>
          </View>
        )}
        <InterestsFinder interests={interests} onAddInterest={this.addInterest.bind(this)} onRemoveInterest={this.removeInterest.bind(this)} />
        {Object.keys(interests).length > 0 && (
          <View style={styles.continueButton}>
            <TouchableOpacity onPress={() => this.goNext(user)} activeOpacity={0.75}>
              <Text style={styles.continueText}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
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
