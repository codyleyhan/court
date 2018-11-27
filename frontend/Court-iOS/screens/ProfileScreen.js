import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Avatar from '../components/Avatar';
import Header from '../components/Header';
import Colors from '../constants/Colors';

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
        width={175} imgURL={profileInfo.imgURL}
        color={profileInfo.color}
        animalName={profileInfo.animalName}
      />
    );

    return (
      <View style={styles.container}>
        // To Do: update header text to name
        <Header text={chatName} />

        <View style={styles.avatarWrapper}>
          {profileIcon}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarWrapper:{
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
