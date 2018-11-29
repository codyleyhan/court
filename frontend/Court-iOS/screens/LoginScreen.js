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
    this.state = { isLoading: false };
  }

  // componentDidMount() {
  //   this.props.navigation.navigate('Setup', { user: { first_name: 'River', picture: { data: { url: "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=723005941386300&height=300&width=300&ext=1544324078&hash=AeRlSN4NlLUXmWcm" } }} });
  // }

  async storeItems(response) {
    try {
      await AsyncStorage.setItem(Authentication.AUTH_USER, JSON.stringify(response.profile));
      await AsyncStorage.setItem(Authentication.AUTH_TOKEN, response.token);
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
      console.log(response);
      if (response && response.success && response.exists) {
        // User successfully logged in, but we should go to app instead of setup
        this.storeItems(response);
        this.props.navigation.navigate('App');
      } else if (response && response.success) {
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
