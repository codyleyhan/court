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
import AwesomeAlert from 'react-native-awesome-alerts';

import { MonoText } from '../components/StyledText';
import { InboxItem } from '../components/InboxComponents';
import Header from '../components/Header';

import Colors from '../constants/Colors';

export default class InboxScreen extends React.Component {
  state = {
    showDeleteModal: false,
  };

  static navigationOptions = {
    header: null,
  };

  setModalVisible = (visible) => {
    this.setState({ showDeleteModal: visible });
  }

  onNavigateToChat = (name, profileInfo) => {
    this.props.navigation.navigate('Chats', {chatName: name, profileInfo: profileInfo});
  }

  render() {
    return (
      <View style={styles.container}>
        // Header bar
        <Header text="Chats" />

        // List of messages
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          // Temp list for example messages
          // TODO(river): populate from an API call
          <InboxItem onPress={this.onNavigateToChat} onLongPress={() => this.setModalVisible(true)} animalName="jellyfish" color={Colors.nightSky} imgUrl="https://heightline.com/wp-content/uploads/Justin-Roberts-640x427.jpg" name="Justin Roberts" lastMessage="I'm really into cooking in my free time!" lastTime="4:02 PM" percent="67"/>
          <InboxItem onPress={this.onNavigateToChat} onLongPress={() => this.setModalVisible(true)} animalName="panda" color={Colors.peach} name="Anonymous Panda" lastMessage="I Love to office so much it's so cool" lastTime="2:15 PM" percent="40"/>
          <InboxItem onPress={this.onNavigateToChat} onLongPress={() => this.setModalVisible(true)} animalName="sloth" color={Colors.mustard} name="Anonymous Sloth" lastMessage="This app is amazing, what are you doing?" lastTime="10:07 AM" percent="15"/>

          // Add a message for new matches
          <Text style={{fontFamily: 'orkney-light', marginTop: 15, textAlign: 'center', color: 'grey'}}>Looking for more chats?</Text>
          <Text style={{fontFamily: 'orkney-light', textAlign: 'center', color: 'grey'}}>{"They'll show up here when you have a match."}</Text>
        </ScrollView>
        <AwesomeAlert
          show={this.state.showDeleteModal}
          showProgress={false}
          title="Remove match?"
          message="You won't match with this person again."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Remove match"
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
            this.setModalVisible(false);
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
