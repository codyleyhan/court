import React from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import Avatar from '../components/Avatar';

export class InboxItem extends React.Component {
  render() {
    const { imgUrl, name, lastMessage, lastTime, percent} = this.props;
    return (
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
    );
  }
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
