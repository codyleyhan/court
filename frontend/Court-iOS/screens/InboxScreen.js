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
import LottieView from 'lottie-react-native';

import { MonoText } from '../components/StyledText';
import { InboxItem } from '../components/InboxComponents';
import FadeWrapper from '../components/FadeWrapper';
import Header from '../components/Header';

import Colors from '../constants/Colors';

import { getMatches, deleteMatch } from '../utils/api/Matches';

export default class InboxScreen extends React.Component {
  state = {
    showDeleteModal: false,
    profileToDelete: null,
    matches: null,
  };

  static navigationOptions = {
    header: null,
  };

  parseMatches = (matchObject) => {
    matches = [];
    if (matchObject) {
      Object.keys(matchObject).map((value, index) => {
        var tempMatch = matchObject[value].profile;
        tempMatch.user_id = value;
        tempMatch.percent_unlocked = matchObject[value].percent_unlocked;
        matches.push(tempMatch);
      });
    }
    console.log(matches);
    return matches;
  }

  constructor() {
    super();
    // getMatches().then(response => {
    //   if (response && response.matches) {
    //     // Got matches object
    //     console.log(response.matches);
    //     matches = this.parseMatches(response.matches);
    //     this.setState({ matches: matches });
    //   } else {
    //     // Error querying API
    //     alert('Error querying matches');
    //   }
    // });
    setTimeout(() => {
      this.setState({ matches: [{user_id: 123, first_name: "Jason", last_name: "Roberts", animal:'deer', color:'blue', interests: {}}] });
    }, 2000);
  }

  setModalVisible = (visible, user_id) => {
    console.log(user_id);
    this.setState({ showDeleteModal: visible, profileToDelete: user_id });
  }

  onNavigateToChat = (name, profileInfo) => {
    this.props.navigation.navigate('Chats', {chatName: name, profileInfo: profileInfo});
  }

  removeMatch = () => {
    deleteMatch(this.state.profileToDelete).then(response => {
      console.log(response);
      if (response && response.status) {
        // Successful, remove from local matches
        var oldMatches = this.state.matches;
        const index = oldMatches.map((x) => {return x.user_id}).indexOf(this.state.profileToDelete);
        console.log(this.state.profileToDelete);
        if (index >= 0) {
          oldMatches.splice(index, 1);
          this.setState({showDeleteModal: false, showmatches: oldMatches, profileToDelete: null});
        }
      } else {
        // error deleting
        alert('Error removing match from server');
        this.setModalVisible(false);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        // Header bar
        <Header text="Chats" />

        // List of messages
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            // Display loading for finding matches
            <FadeWrapper visible={this.state.matches === null} >
              <LottieView
                source={require('../assets/animations/preloader.json')}
                autoPlay
                speed={0.75}
                loop={true}
                style={styles.animation}
              />
              <Text style={{fontFamily: 'orkney-light', fontSize: 25, textAlign: 'center', color: 'grey'}}>Looking for matches...</Text>
            </FadeWrapper>
            // No matches
            <FadeWrapper visible={this.state.matches !== null && this.state.matches.length == 0} delay={300}>
              <Text style={{fontFamily: 'orkney-medium', marginTop: 100, fontSize: 35, textAlign: 'center', color: 'grey'}}>No matches...</Text>
              <Text style={{marginTop: 50, fontSize: 100, textAlign: 'center'}}>😢</Text>
              <Text style={{fontFamily: 'orkney-regular', marginTop: 50, fontSize: 20, textAlign: 'center', color: 'grey'}}>{"Don't worry, we'll keep looking.\nCome back later to check again!"}</Text>
            </FadeWrapper>
            // Show match list
            <FadeWrapper visible={this.state.matches !== null && this.state.matches.length > 0} delay={300}>
              {this.state.matches && this.state.matches.map((val, index) => (
                <InboxItem key={val} profile={val} onPress={this.onNavigateToChat} onLongPress={() => this.setModalVisible(true, val.user_id)} lastMessage="I'm really into cooking in my free time!" lastTime="4:02 PM"/>
              ))}
              // Add a message for new matches
              <Text style={{fontFamily: 'orkney-light', marginTop: 15, textAlign: 'center', color: 'grey'}}>Looking for more chats?</Text>
              <Text style={{fontFamily: 'orkney-light', textAlign: 'center', color: 'grey'}}>{"They'll show up here when you have a match."}</Text>
            </FadeWrapper>
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
            this.removeMatch();
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
  animation: {
    width: 310,
    height: 310,
    marginTop: 40,
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
