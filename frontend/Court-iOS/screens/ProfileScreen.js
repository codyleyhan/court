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
import Header from '../components/Header';
import Colors from '../constants/Colors';
import InterestsCloud from '../components/InterestsCloud';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const chatName = navigation.getParam('chatName', 'Profile');
    //const profileInfo = navigation.getParam('profileInfo', {});
    const profileInfo = {imgURL: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1957294744324290&height=300&width=300&ext=1545942632&hash=AeTWXCxPFYgeBIRK', animalName:'sloth', color:Colors.merlot}
    const profileIcon = (
      <Avatar
        width={160} imgURL={profileInfo.imgURL}
        color={profileInfo.color}
        animalName={profileInfo.animalName}
        showSubIcon={true}
      />
    );

    const recommendations = [{id: '1', title:'The Office', description:'US Sitcom'}, {id: '2', title:'Dog', description:'Animal'},{id: '3', title:'Marvel Comics', description:'Publishing company'},{id: '4', title:'United States mens national soccer team', description:'Soccer team'}];

    return (
      <View style={styles.container}>

        <View style={styles.avatarWrapper}>
          {profileIcon}
        </View>

        <View style={[{borderBottomColor: profileInfo.color}, styles.nameContainer]}>
          <Text style={[{marginTop: 20, color: profileInfo.color}, styles.nameStyle]}>{'Jessica Douma'}</Text>
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
                <InterestsCloud recommendations={recommendations} />
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
