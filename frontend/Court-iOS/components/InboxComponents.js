import React from 'react';
import PropTypes from 'prop-types';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Avatar from '../components/Avatar';

/**
* Card in the user's inbox for each of their current chats
*/
export class InboxItem extends React.Component {
  onPressChat() {
    // This is where we should handle navigation to the chat screen

  }

  render() {
    const { imgUrl, name, lastMessage, lastTime, percent} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={this.onPressChat}>
        <View style={styles.InboxCard}>
          <View style={styles.avatarWrapper}>
            <Avatar width={65} src={imgUrl}/>
          </View>
          <View style={styles.inboxTextWrapper}>
            <Text style={styles.nameStyle} numberOfLines={1}>{name}</Text>
            <Text style={styles.messageStyle} numberOfLines={1}>{lastMessage}</Text>
            <Text style={styles.timeStyle}>{lastTime}</Text>
          </View>
          <View >
            <Text style={styles.percentStyle}>{percent}%</Text>
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
  imgUrl: PropTypes.string.isRequired,
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
    fontSize: 25,
    color: '#21ACA5',
  },
  messageStyle: {
    fontSize: 15,
  },
  timeStyle: {
    paddingTop: 8,
    color: 'grey',
  },
  percentStyle: {
    fontSize: 25,
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
