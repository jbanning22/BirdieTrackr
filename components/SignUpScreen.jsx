import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import axios from 'axios';
import {AuthContext} from '../AuthContext';

const SignUpScreen = ({navigation}) => {
  const {signedIn, setSignedIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const signUp = async () => {
    try {
      const signUpRes = await axios.post('http://localhost:3000/auth/signup', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
      });
      //   console.log('sign up res', signUpRes.data.access_token);
      //   console.log('sign up res', signUpRes.data.refresh_token);
      if (signUpRes.status === 201) {
        const access_token = await signUpRes.data.access_token;
        const refresh_token = await signUpRes.data.refresh_token;
        await AsyncStorage.setItem('token', access_token);
        await AsyncStorage.setItem('ReToken', refresh_token);
        setSignedIn(true);
        navigation.navigate('App', {screen: 'Scorecard'});
        return signUpRes.data;
      }
    } catch (error) {
      console.log('error signing up', error);
    }
  };

  return (
    // <SafeAreaView style={styles.box1}>
    <ScrollView contentContainerStyle={styles.box1}>
      <Text style={styles.singUpText}>Join the IDISC Community!</Text>
      <TextInput
        placeholder="Username"
        style={styles.emailInput}
        value={userName}
        onChangeText={setUserName}
        clearButtonMode={'always'}
        autoCorrect={false}
      />
      <TextInput
        placeholder="First Name"
        style={styles.emailInput}
        value={firstName}
        onChangeText={setFirstName}
        clearButtonMode={'always'}
        autoCorrect={false}
      />
      <TextInput
        placeholder="Last Name"
        style={styles.emailInput}
        value={lastName}
        onChangeText={setLastName}
        clearButtonMode={'always'}
        autoCorrect={false}
      />
      <TextInput
        placeholder="Email"
        style={styles.emailInput}
        value={email}
        onChangeText={setEmail}
        clearButtonMode={'always'}
        autoCorrect={false}
        autoCapitalize={'none'}
      />
      <TextInput
        placeholder="Password"
        style={styles.loginTextInput}
        value={password}
        onChangeText={setPassword}
        clearButtonMode={'always'}
        secureTextEntry={true}
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.textButton} onPress={signUp}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <Button title="Back" onPress={() => navigation.navigate('Landing')} />
    </ScrollView>
    // {/* </SafeAreaView> */}
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singUpText: {
    fontSize: 28,
    fontWeight: '500',
    fontFamily: 'Helvetica',
    marginBottom: 80,
  },
  signUpButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB6F52',
    marginTop: 35,
    marginBottom: 15,
  },
  loginTextInput: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    // marginTop: 10,
  },
  emailInput: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  },
});
