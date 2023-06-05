import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';

const SignInScreen = ({navigation}) => {
  const {signedIn, setSignedIn} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const signIn = async () => {
    const errorsExist = Object.values(validationErrors).some(
      error => error !== '',
    );
    if (errorsExist) {
      // eslint-disable-next-line no-console
      console.log('Please fix the form errors before signing up.');
      return;
    } else {
      try {
        const signInRes = await axios.post(
          'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/auth/signin',
          {
            email: formData.email,
            password: formData.password,
          },
        );
        if (signInRes.status === 200) {
          const access_token = await signInRes.data.access_token;
          const refresh_token = await signInRes.data.refresh_token;

          await AsyncStorage.setItem('token', access_token);
          await AsyncStorage.setItem('ReToken', refresh_token);
          await setSignedIn(true);
          await navigation.navigate('App', {screen: 'Scorecard'});
          return signInRes.data;
        }
      } catch (error) {
        throw new Error('Error signing in');
      }
    }
  };
  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(formData.email);
    setValidationErrors({
      ...validationErrors,
      email: isValid ? '' : 'Email is required and must be valid.',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.box1}>
      <Text style={styles.homeText}>Sign In to DG Scorecard</Text>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Email"
          style={
            validationErrors.email
              ? styles.loginTextInput2
              : styles.loginTextInput1
          }
          value={formData.email}
          onChangeText={text => setFormData({...formData, email: text})}
          onBlur={validateEmail}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <Text style={{color: 'red'}}>{validationErrors.email}</Text>
        <TextInput
          placeholder="Password"
          style={styles.loginTextInput1}
          value={formData.password}
          onChangeText={text => setFormData({...formData, password: text})}
          autoCapitalize={'none'}
          secureTextEntry={true}
          autoCorrect={false}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.loginButton} onPress={signIn}>
        <Text style={styles.textButton}>Log in</Text>
      </TouchableOpacity>
      <Button title="Back" onPress={() => navigation.navigate('Landing')} />
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 28,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 80,
  },
  loginButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52BEDB',
    marginBottom: 40,
    marginTop: 20,
  },
  loginTextInput2: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: '#F9908D',
    marginTop: 10,
  },
  loginTextInput1: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  },
});
