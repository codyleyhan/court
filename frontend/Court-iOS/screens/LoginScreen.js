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

import { Transition } from 'react-navigation-fluid-transitions';

import Authentication from '../constants/Authentication';
import Colors from '../constants/Colors';
import LoginButton from '../components/LoginButton';
import { MediumText } from '../components/StyledText';
import { logInWithFacebook } from '../utils/Login';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this.props.navigation.navigate('Setup', { user: { first_name: 'River', picture: { data: { url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=723005941386300&height=300&width=300&ext=1544324078&hash=AeRlSN4NlLUXmWcm" } }} });
  }

  async storeItems(response) {
    try {
      await AsyncStorage.setItem(Authentication.AUTH_USER, JSON.stringify(response.user));
      await AsyncStorage.setItem(Authentication.AUTH_TOKEN, response.token);
    } catch (error) {
      // Error saving data
      alert('Error saving credentials', 'Please login again');
    }
  }

  handleLoginPress = () => {
    // Handle pressing login here
    this.setState({ isLoading: true });
    logInWithFacebook().then((response) => {
      console.log(response);
      if (response && response.success) {
        // Store credentials
        this.storeItems(response);
        // Navigate to setup screen
        this.props.navigation.navigate('Setup', { user: response.user });
      } else {
        alert('Login failed');
      }
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        // White Logo Display
        <Transition shared="logo">
          <Image
            style={styles.logoImage}
            source={ require('../assets/images/court-logo-white.png') }
          />
        </Transition>
        // Text Logo
        <MediumText style={styles.logoText}>court</MediumText>
        // Login Button
        {this.state.isLoading ?
          <ActivityIndicator color={Colors.teal} size='large' />
          : <LoginButton onPress={this.handleLoginPress} text="Continue with Facebook" showLogo={true}/>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 200,
    height: 200,
    tintColor: Colors.teal,
  },
  logoText: {
    fontSize: 70,
    color: Colors.teal,
    marginTop: -20,
    marginBottom: 300,
  }
});
