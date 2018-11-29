import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Haptic } from 'expo';

import Avatar from '../components/Avatar';

import Colors from '../constants/Colors';

/**
* Card in the user's inbox for each of their current chats
*/
export class InboxItem extends React.Component {
  onPressChat = () => {
    const { profile, lastMessage, lastTime} = this.props;
    // This is where we should handle navigation to the chat screen
    this.props.onPress(this.props.name, profile);
    // Provide Haptic Feedback
    Haptic.impact('light');
  }

  onLongPress = () => {
    if (this.props.onLongPress) {
      Haptic.impact('medium');
      this.props.onLongPress();
    }
  }

  render() {
    const { profile, lastMessage, lastTime} = this.props;
    const { animal, color, first_name, last_name, profile_picture, percent_unlocked } = profile;
    const displayName = first_name ? first_name + ' ' + last_name : 'Anonymous ' + animal.charAt(0).toUpperCase() + animal.slice(1);;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={this.onPressChat} onLongPress={this.onLongPress}>
        <View style={styles.InboxCard}>
          <View style={styles.avatarWrapper}>
            <Avatar width={65} imgURL={profile_picture} animalName={animal} color={Colors[color]}/>
          </View>
          <View style={styles.inboxTextWrapper}>
            <Text style={styles.nameStyle} numberOfLines={1}>{displayName}</Text>
            <Text style={styles.messageStyle} numberOfLines={1}>{lastMessage}</Text>
            <Text style={styles.timeStyle}>{lastTime}</Text>
          </View>
          <View >
            <Text style={styles.percentStyle}>{percent_unlocked}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

InboxItem.propTypes = {
  /**
  * URL for the given user's profile picture
  */
  imgUrl: PropTypes.string,
  /**
  * Name of the other user in the chat
  */
  name: PropTypes.string.isRequired,
  /**
  * The text of the last message sent in the chat
  */
  lastMessage: PropTypes.string.isRequired,
  /**
  * The time that the last message was sent
  */
  lastTime: PropTypes.string.isRequired,
  /**
  * Percent of profile unlocked for the given user
  */
  percent: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  InboxCard: {
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
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 15,
    flex: 1,
    flexDirection: 'row',
  },
  avatarWrapper:{
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inboxTextWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  nameStyle: {
    fontSize: 22,
    fontFamily: 'orkney-medium',
    color: '#21ACA5',
  },
  messageStyle: {
    fontFamily: 'orkney-regular',
    fontSize: 15,
  },
  timeStyle: {
    paddingTop: 8,
    fontFamily: 'orkney-light',
    color: 'grey',
  },
  percentStyle: {
    fontSize: 22,
    fontFamily: 'orkney-medium',
    color: '#21ACA5',
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green',
    flexDirection: 'column',
  }
});
