import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';
import LoginButton from '../components/LoginButton';
import { logInWithFacebook } from '../utils/Login';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  handleLoginPress = () => {
    // Handle pressing login here
    this.setState({ isLoading: true });
    logInWithFacebook().then((response) => {
      console.log(response);
      this.setState({ isLoading: false });
      if (response && response.success) {
        // Store credentials
        _storeData = async () => {
          try {
            await AsyncStorage.setItem('auth_user', response.user);
            await AsyncStorage.setItem('auth_token', response.token);
          } catch (error) {
            // Error saving data
            alert('Error saving credentials', 'Please login again');
          }
        }
        // Navigate to main app
        this.props.navigation.navigate('App');
      } else {
        alert('Login failed');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        // White Logo Display
        <Image
          style={styles.logoImage}
          source={ require('../assets/images/court-logo-white.png') }
        />
        // Text Logo
        <Text style={styles.logoText}>court</Text>
        // Login Button
        {this.state.isLoading ?
          <ActivityIndicator color='white' size='large' />
          : <LoginButton onPress={this.handleLoginPress}/>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.teal,
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
  },
  logoText: {
    fontSize: 70,
    color: 'white',
    marginTop: -20,
    marginBottom: 300,
  }
});
