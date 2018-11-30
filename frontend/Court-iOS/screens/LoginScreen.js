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

import { Haptic, WebBrowser } from 'expo';
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
    AsyncStorage.getItem(Authentication.AUTH_TOKEN).then((token) => {
      if (token !== null) {
        this.props.navigation.navigate('App');
      }
    });
    this.state = { isLoading: false };
  }

  async storeItems(response) {
    try {
      await AsyncStorage.setItem(Authentication.AUTH_USER, JSON.stringify(response.profile));
      await AsyncStorage.setItem(Authentication.AUTH_TOKEN, response.token);
      console.log(response.profile.first_name);
      console.log(response.token);
    } catch (error) {
      // Error saving data
      alert('Error saving credentials', 'Please login again');
    }
  }

  handleLoginPress = () => {
    // Handle pressing login here
    Haptic.impact('light');
    this.setState({ isLoading: true });
    logInWithFacebook().then((response) => {
      if (response && response.success && response.exists) {
        // User successfully logged in, but we should go to app instead of setup
        this.storeItems(response).then(() => {
          this.props.navigation.navigate('App');
          // this.props.navigation.navigate('Setup', { user: response.profile });
        });
      } else if (response && response.success) {
        // Store credentials
        this.storeItems(response);
        // Navigate to setup screen
        this.props.navigation.navigate('Setup', { user: response.profile });
      } else if (response === 'cancelled') {
        this.setState({ isLoading: false });
      } else {
        alert('Login failed');
        this.setState({ isLoading: false });
      }
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
          : (
            <View>
              <LoginButton onPress={this.handleLoginPress} text="Continue with Facebook" showLogo={true}/>
              // Terms and Conditions
              <Text style={{fontFamily: 'orkney-light', marginTop: 25, textAlign: 'center', color: 'grey'}}>{"By continuing, you agree to Court's"}</Text>
              <Text style={{fontFamily: 'orkney-light', textAlign: 'center', color: 'grey', marginTop: 2}}>
                <Text style={{fontFamily: 'orkney-bold'}} onPress={()=>WebBrowser.openBrowserAsync('https://termsfeed.com/legal/terms-of-use')}>
                  {"Terms of Service "}
                </Text>
                 and
               <Text style={{fontFamily: 'orkney-bold'}} onPress={()=>WebBrowser.openBrowserAsync('https://termsfeed.com/legal/privacy-policy')}>
                  {" Privacy Policy"}
               </Text>
              </Text>
            </View>
          )
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
    marginBottom: 350,
  }
});
