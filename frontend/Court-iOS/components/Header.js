import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

export default class Header extends React.Component {
  render() {
    const { text, rightIcon, leftIcon} = this.props;
    return (
      <View style={styles.headerContainer}>
        {leftIcon}
        <Text style={styles.headerTitle}>{text}</Text>
        {rightIcon}
      </View>
    );
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
    fontSize: 30,
    flex: 1,
    textAlign: 'center',
  }
});
