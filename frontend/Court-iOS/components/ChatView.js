import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Haptic } from 'expo';
import { Bubble, Composer, InputToolbar, GiftedChat, MessageText, Send, Time } from 'react-native-gifted-chat'

import { AsyncStorage, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from './Avatar';
import Mask from 'react-native-mask';
import Authentication from '../constants/Authentication';
import Network from '../constants/Network';
import Colors from '../constants/Colors';

const io = require('socket.io-client');

export default class ChatView extends React.Component {
  state = {
    messages: [],
  }

  constructor(props) {
    super(props);
    this.thread_id = props.thread_id;
    this.currentUserID = props.currentUserID;
    this.setUpSocket();
    this.state = { messages: props.messages };
  }

  handleNewMessage = (message) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [{
          _id: message.id,
          text: message.body,
          createdAt: message.created_at,
          user: {
            _id: message.user_id,
          },
        }]),
    }));
  }

  setUpSocket = () => {
    // Fetch auth token, connect to a socket
    AsyncStorage.getItem(Authentication.AUTH_TOKEN).then((auth_token) => {
      if (auth_token !== null) {
        this.socket = io(Network.base_socket_url, {
          transports: ['websocket'],
          query: { token: auth_token },
        });
        this.socket.on('connect', () => {
          // Join thread
          this.socket.emit('join', {
            thread: this.thread_id,
          });
        });
        this.socket.on('new_message', (message) => {
          this.handleNewMessage(message);
        });
      }
    });
  }

  onSend = (messages = []) => {
    Haptic.impact('light');
    // Send over socket
    for (x in messages) {
      // Emitting message object
      this.socket.emit('message', {
        body: messages[x].text,
        thread: this.thread_id,
      });
    }
  }

  renderAvatar = () => {
    const { goToProfile, profileInfo } = this.props;
    const { name, animal, color, profile_picture } = profileInfo;
    return (
      <TouchableOpacity onPress={goToProfile} activeOpacity={0.75}>
        <Avatar
          width={37}
          imgURL={profile_picture}
          color={Colors[color]}
          animalName={animal}
        />
      </TouchableOpacity>
    );
  }

  renderBubble = (props) => {
    const { color } = this.props;
    const styleColor = color ? color : Color.coral;
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: [styles.leftBubble, {backgroundColor: styleColor}],
          right: styles.rightBubble,
        }}
      />
    );
  }

  renderMessageText(props) {
    return (
      <MessageText
        {...props}
        textStyle={{
          left: styles.leftText,
          right: styles.rightText,
        }}
      />
    );
  }

  renderTime(props) {
    return (
      <Time
        {...props}
        containerStyle={{ left: [styles.timeContainer], right: [styles.timeContainer] }}
        textStyle={{
          left: styles.leftText,
          right: styles.rightText,
        }}
      />
    );
  }

  renderComposer(props) {
    return (
      <Composer
        {...props}
        textInputStyle={styles.composer}
        placeholder={'Type message...'}
        multiline={true}
      />
    );
  }

  renderSend = (props) => {
    const { profileInfo } = this.props;
    const { color } = profileInfo;
    const styleColor = color ? Colors[color] : Colors.peach;
    const sendButton = (
      <View style={{marginRight: 10, marginBottom: 4}}>
        <Mask shape={'circle'}>
          <View style={[styles.sendButton, {backgroundColor: styleColor}]}>
            <Icon.Ionicons
              name='ios-send'
              size={35}
              color='white'
            />
          </View>
        </Mask>
      </View>
    );
    return (
      <Send {...props}>
        {sendButton}
      </Send>
    );
  }

  renderFooter = (props) => {
    return (
      null
      // <View style={styles.footerContainer}>
      //   <Text style={styles.footerText}>
      //     {"You've unlocked a new interest!"}
      //   </Text>
      // </View>
    );
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderAvatar={this.renderAvatar}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        renderTime={this.renderTime}
        renderMessageText={this.renderMessageText}
        renderComposer={this.renderComposer}
        renderFooter={this.renderFooter}
        minInputToolbarHeight={40}
        bottomOffset={76}
        user={{
          _id: this.props.currentUserID,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    fontFamily: 'orkney-medium',
    color: '#aaa',
    textAlign: 'center',
  },
  sendButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    paddingRight: 2,
    paddingTop: 1,
  },
  leftBubble: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
      },
    }),
    marginBottom: 4,
  },
  rightBubble: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
      },
    }),
    backgroundColor: 'white',
    marginBottom: 4,
  },
  leftText: {
    fontFamily: 'orkney-medium',
    color: 'white',
    paddingTop: 3,
    marginBottom: -2,
  },
  rightText: {
    fontFamily: 'orkney-medium',
    color: 'black',
    paddingTop: 3,
    marginBottom: -2,
  },
  leftTime: {
    fontFamily: 'orkney-light',
    textAlign: 'left',
    color: 'white',
  },
  rightTime: {
    fontFamily: 'orkney-light',
    textAlign: 'right',
    color: 'black',
  },
  composer: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 15,
      },
    }),
    backgroundColor: 'white',
    marginBottom: 4,
    fontFamily: 'orkney-medium',
    fontSize: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 8,
    marginRight: 10,
    lineHeight: 25,
  },
  inputToolbar: {
    backgroundColor: 'green',
  }
});

ChatView.propTypes = {
  /**
  * Text to be rendered in center of header
  */
  // messages: PropTypes.arrayOf(messages),
  // /**
  // * Component to be rendered on left side of header
  // */
  // rightIcon: PropTypes.node,
  // /**
  // * Component to be rendered on right side of header
  // */
  // leftIcon: PropTypes.node,
}
