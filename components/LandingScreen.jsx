import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>Welcome to IDISC!</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('SignInPage')}>
        <Text style={styles.textButton}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('SignUpPage')}>
        <Text style={styles.textButton2}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#32B1E8',
    marginBottom: 40,
    marginTop: 20,
  },
  signUpButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E58315',
    marginTop: 10,
  },
  homeText: {
    fontSize: 32,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    marginBottom: 80,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  },
  textButton2: {
    fontSize: 18,
    color: 'black',
  },
});
