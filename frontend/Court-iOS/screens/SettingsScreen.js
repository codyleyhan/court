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
    return (
      <View style={styles.container}>
        // To Do: update header text to name
        <Header text="River Mist" />

        <View style={styles.avatarWrapper}>
            <Avatar width={175} isLocal={false} src='https://scontent-lax3-1.xx.fbcdn.net/v/t1.0-1/p320x320/45633486_724429254577302_7800013110386884608_n.jpg?_nc_cat=110&_nc_ht=scontent-lax3-1.xx&oh=047aee994e46263362c790eacf1d9488&oe=5C840353'/>
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
