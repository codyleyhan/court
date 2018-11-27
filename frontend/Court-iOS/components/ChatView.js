import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'expo';
import { GiftedChat, Send } from 'react-native-gifted-chat'

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

  renderSend(props) {
    const sendButton = (
      <View style={{marginRight: 10, marginBottom: 5}}>
        <Mask shape={'circle'}>
          <View style={{width: 35, height: 35, backgroundColor: Colors.peach, alignItems: 'center', paddingRight: 2, paddingTop: 1}}>
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
        renderSend={this.renderSend}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#21ACA5',
    borderBottomWidth: 2,
    backgroundColor: '#fff',
  },
  headerTitle: {
    color: '#21ACA5',
    fontFamily: 'orkney-medium',
    paddingTop: 10,
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
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
