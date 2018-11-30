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
import { Icon } from 'expo';
import AwesomeAlert from 'react-native-awesome-alerts';

import Avatar from '../components/Avatar';
import Header from '../components/Header';

import Authentication from '../constants/Authentication';
import Colors from '../constants/Colors';
import InterestsCloud from '../components/InterestsCloud';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    profileInfo: {},
    showDeleteModal: false,
  };

  constructor() {
    super();
    this.getProfile();
  }

  getProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem(Authentication.AUTH_USER);
      this.setState({ profileInfo: JSON.parse(profile) });
    } catch (error) {
      // Error saving data
      alert('Error loading profile', 'Please login again');
      // TODO logout user here
    }
  }

  // Parses a dict of interests into a list
  parseInterests = (interests) => {
    var recommendations = [];
    if (interests) {
      interests = JSON.parse(interests);
      Object.keys(interests).map((key, index) => {
        var tempInterests = interests[key];
        tempInterests.id = key;
        recommendations.push(tempInterests);
      });
    }
    return recommendations;
  }

  setModalVisible = (visible) => {
    this.setState({ showDeleteModal: visible });
  }

  // Removes a current users information and auth token, redirects to login screen
  logout = () => {
    AsyncStorage.removeItem(Authentication.AUTH_USER).then(() => {
      AsyncStorage.removeItem(Authentication.AUTH_TOKEN).then(() => {
        this.props.navigation.navigate('Auth');
      })
    });
  }

  render() {
    const { profileInfo } = this.state;
    const { profile_picture, color, animal, interests, first_name, last_name, gender, preferred_gender } = profileInfo;
    const profileIcon = (
      <Avatar
        width={160}
        imgURL={profile_picture}
        color={Colors[color]}
        animalName={animal}
        showSubIcon={true}
      />
    );

    const recommendations = this.parseInterests(interests);

    return (
      <View style={styles.container}>

        <View style={styles.avatarWrapper}>
          {profileIcon}
        </View>

        <View style={[{borderBottomColor: Colors[color]}, styles.nameContainer]}>
          <Text style={[{marginTop: 20, color: Colors[color]}, styles.nameStyle]}>{first_name + ' ' + last_name}</Text>
        </View>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.pillWrapper}>
            <View style={styles.pill}>
              <Text style={[{color: Colors[color]}, styles.preferenceStyle]}>{'Gender:'}</Text>
              <Text style={[{color: Colors[color]}, styles.pillTextStyle]}>{gender}</Text>
            </View>
          </View>

          <View style={styles.pillWrapper}>
            <View style={styles.pill}>
              <Text style={[{color: Colors[color]}, styles.preferenceStyle]}>{'Preferred Gender:'}</Text>
              <Text style={[{color: Colors[color]}, styles.pillTextStyle]}>{preferred_gender}</Text>
            </View>
          </View>

          <View style={styles.pillWrapper}>
            <View style={styles.interestsPill}>
              <Text style={[{color: Colors[color], marginRight: 200}, styles.preferenceStyle]}>{'Interests:'}</Text>
              <View style={{marginBottom:30}}>
                <InterestsCloud color={Colors[color]} recommendations={recommendations} />
              </View>
            </View>
          </View>

        </ScrollView>

        // Logout button

        <View style={[styles.logoutButton, {backgroundColor: Colors[color]}]}>
          <TouchableOpacity onPress={() => this.setModalVisible(true)} activeOpacity={0.5}>
            <Icon.Ionicons
              name='ios-log-out'
              size={25}
              color='white'
            />
          </TouchableOpacity>
        </View>

        // Logout Confirmation Modal
        <AwesomeAlert
          show={this.state.showDeleteModal}
          showProgress={false}
          title="Logout?"
          message="Your profile info and matches will be saved."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Logout"
          contentContainerStyle={styles.removeContainer}
          titleStyle={styles.removeTitle}
          messageStyle={styles.removeMessage}
          cancelButtonStyle={styles.removeButton}
          confirmButtonStyle={styles.removeButton}
          cancelButtonTextStyle={styles.cancelButtonText}
          confirmButtonTextStyle={styles.removeButtonText}
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.setModalVisible(false);
          }}
          onConfirmPressed={() => {
            this.logout();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 20,
  },
  avatarWrapper:{
    marginTop: 45,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  nameContainer: {
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },
  nameStyle: {
    fontFamily: 'orkney-medium',
    paddingTop: 10,
    fontSize: 30,
    textAlign: 'center',
    borderBottomColor: '#21ACA5',
    borderBottomWidth: 2,
  },
    preferenceStyle: {
    fontFamily: 'orkney-light',
    paddingTop: 10,
    fontSize: 20,
    textAlign: 'left',
  },
  pillWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  pillTextStyle: {
    fontFamily: 'orkney-medium',
    paddingTop: 10,
    fontSize: 20,
    textAlign: 'center',
    flexDirection: 'row',
    marginLeft: 20,
  },
    pill: {
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
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    flexDirection: 'row',
  },
  interestsPill: {
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
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  logoutButton: {
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
    position: 'absolute',
    top: 45,
    right: 20,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
    paddingLeft: 4,
    zIndex: 100,
  },
  removeContainer: {
    borderRadius: 15,
  },
  removeButton: {
    borderRadius: 15,
    padding: 20,
  },
  removeTitle: {
    fontFamily: 'orkney-medium',
    fontSize: 30,
  },
  removeMessage: {
    fontFamily: 'orkney-regular',
    fontSize: 15,
  },
  removeButtonText: {
    fontFamily: 'orkney-medium',
    fontSize: 25,
    paddingTop: 7,
  },
  cancelButtonText: {
    fontFamily: 'orkney-medium',
    fontSize: 25,
    paddingTop: 7,
  },
});
