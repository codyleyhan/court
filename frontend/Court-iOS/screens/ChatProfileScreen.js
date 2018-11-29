import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Avatar from '../components/Avatar';
import InterestsCloud from '../components/InterestsCloud';
import Header from '../components/Header';
import Colors from '../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const chatName = navigation.getParam('name', 'Profile');
    const profileInfo = navigation.getParam('profileInfo', {});

    const profileIcon = (
      <Avatar
        width={175}
        imgURL={profileInfo.imgUrl}
        color={profileInfo.color}
        animalName={profileInfo.animalName}
        showSubIcon={true}
      />
    );

    const rightIcon = (
      <View style={{width: 40, height: 40}} />
    );

    const recommendations = [{id: '1', title:"Suckin' Dick", description:'Pasttime'}, {id: '2', title:'Dogs', description:'Animal'},{id: '3', title:'Marvel', description:'Comic Publisher'},{id: '4', title:'Money', description:'Object'}, {id: '5', title:'React Native', description:'JavaScript Framework'}];

    return (
      <View style={styles.container}>
        <Header color={profileInfo.color} text={chatName} showBack={true} rightIcon={rightIcon} navigation={this.props.navigation} />
        <View style={styles.avatarWrapper}>
          {profileIcon}
        </View>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.pillWrapper}>
            <View style={styles.pill}>
              <Text style={[{color: profileInfo.color}, styles.preferenceStyle]}>{'Gender:'}</Text>
              <Text style={[{color: profileInfo.color}, styles.pillTextStyle]}>{'Female'}</Text>
            </View>
          </View>

          <View style={styles.pillWrapper}>
            <View style={styles.pill}>
              <Text style={[{color: profileInfo.color}, styles.preferenceStyle]}>{'Preferred Gender:'}</Text>
              <Text style={[{color: profileInfo.color}, styles.pillTextStyle]}>{'Male'}</Text>
            </View>
          </View>

          <View style={styles.pillWrapper}>
            <View style={styles.interestsPill}>
              <Text style={[{color: profileInfo.color, marginRight: 200}, styles.preferenceStyle]}>{'Interests:'}</Text>
              <View style={{marginBottom:30}}>
                <InterestsCloud color={profileInfo.color} recommendations={recommendations} />
              </View>
            </View>
          </View>

        </ScrollView>

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
});
