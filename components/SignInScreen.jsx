import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {AuthContext} from '../AuthContext';

const SignInScreen = ({navigation}) => {
  const {signedIn, setSignedIn} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');

  const signIn = async () => {
    const errorsExist = Object.values(validationErrors).some(
      error => error !== '',
    );
    if (errorsExist) {
      console.log('Please fix the form errors before signing up.');
      return;
    } else {
      try {
        const signInRes = await axios.post(
          'http://192.168.1.154:3000/auth/signin',
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
          setSignedIn(true);
          navigation.navigate('App', {screen: 'Scorecard'});
          return signInRes.data;
        }
      } catch (error) {
        console.log('error signing in', error);
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
    // <SafeAreaView>
    <ScrollView contentContainerStyle={styles.box1}>
      <Text style={styles.homeText}>Welcome Back!</Text>
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
          //   value={email}
          //   onChangeText={setEmail}
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
          //   value={password}
          //   onChangeText={setPassword}
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
    // {/* </SafeAreaView> */}
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
    fontSize: 40,
    fontWeight: '500',
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
