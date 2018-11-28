import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Avatar from '../components/Avatar';
import ChatView from '../components/ChatView';
import Header from '../components/Header';
import { Transition } from 'react-navigation-fluid-transitions';

import Colors from '../constants/Colors';

export default class ChatScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  goToProfile(name, profileInfo) {
    this.props.navigation.navigate('ChatProfile', {name: name, profileInfo: profileInfo});
  }

  render() {
    const { navigation } = this.props;
    const chatName = navigation.getParam('chatName', 'Messages');
    const profileInfo = navigation.getParam('profileInfo', {});

    const profileIcon = (
      <TouchableOpacity onPress={() => this.goToProfile(chatName, profileInfo)} activeOpacity={0.75}>
        <Avatar
          width={40}
          imgURL={profileInfo.imgUrl}
          color={profileInfo.color}
          animalName={profileInfo.animalName}
        />
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        // Header bar
        <Header text={chatName} showBack={true} rightIcon={profileIcon} navigation={this.props.navigation}/>
        // Chats
        <ChatView />
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  InboxScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
