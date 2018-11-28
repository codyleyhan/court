import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';
import { Bubble, Composer, InputToolbar, GiftedChat, MessageText, Send, Time } from 'react-native-gifted-chat'

import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Mask from 'react-native-mask';
import Colors from '../constants/Colors';

/**
* Creates header with centered text, and optional left and right components
*/
export default class ChatView extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'I have hugeeeeee ballz!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Justin Roberts',
            avatar: 'https://heightline.com/wp-content/uploads/Justin-Roberts-640x427.jpg',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
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

  renderSend(props) {
    const sendButton = (
      <View style={{marginRight: 10, marginBottom: 5}}>
        <Mask shape={'circle'}>
          <View style={styles.sendButton}>
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

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        renderTime={this.renderTime}
        renderMessageText={this.renderMessageText}
        renderComposer={this.renderComposer}
        minInputToolbarHeight={40}
        bottomOffset={76}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  sendButton: {
    width: 35,
    height: 35,
    backgroundColor: Colors.peach,
    alignItems: 'center',
    paddingRight: 2,
    paddingTop: 2,
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
