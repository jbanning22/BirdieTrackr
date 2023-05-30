import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../AuthContext';

const SignUpScreen = ({navigation}) => {
  const {setSignedIn} = useContext(AuthContext);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    city: '',
    state: '',
  });

  const signUp = async () => {
    const errorsExist = Object.values(validationErrors).some(
      error => error !== '',
    );
    if (errorsExist) {
      console.log('Please fix the form errors before signing up.');
      return;
    } else {
      try {
        const signUpRes = await axios.post(
          'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/auth/signup',
          formData,
        );
        if (signUpRes.status === 201) {
          const access_token = await signUpRes.data.access_token;
          const refresh_token = await signUpRes.data.refresh_token;
          await AsyncStorage.setItem('token', access_token);
          await AsyncStorage.setItem('ReToken', refresh_token);
          await setSignedIn(true);
          await navigation.navigate('App', {screen: 'Scorecard'});
          return signUpRes.data;
        }
      } catch (error) {
        console.log('error signing up', error);
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
      <Text style={styles.singUpText}>Join the IDISC Community!</Text>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Username"
          style={styles.emailInput}
          value={formData.userName}
          onChangeText={text => setFormData({...formData, userName: text})}
          clearButtonMode={'always'}
          autoCorrect={false}
        />
        <TextInput
          placeholder="First Name"
          style={styles.emailInput}
          value={formData.firstName}
          onChangeText={text => setFormData({...formData, firstName: text})}
          clearButtonMode={'always'}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.emailInput}
          value={formData.lastName}
          onChangeText={text => setFormData({...formData, lastName: text})}
          clearButtonMode={'always'}
          autoCorrect={false}
        />
        <TextInput
          placeholder="Email"
          style={
            validationErrors.email ? styles.emailInput2 : styles.emailInput
          }
          value={formData.email}
          onBlur={validateEmail}
          onChangeText={text => setFormData({...formData, email: text})}
          clearButtonMode={'always'}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
        <TextInput
          placeholder="City"
          style={styles.emailInput}
          value={formData.city}
          onChangeText={text => setFormData({...formData, city: text})}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="State"
          style={styles.emailInput}
          value={formData.userState}
          onChangeText={text => setFormData({...formData, state: text})}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="Password"
          style={styles.loginTextInput}
          value={formData.password}
          onChangeText={text => setFormData({...formData, password: text})}
          clearButtonMode={'always'}
          secureTextEntry={true}
          autoCorrect={false}
        />
      </KeyboardAvoidingView>
      <Text style={{color: 'red', marginTop: 10}}>
        {validationErrors.email}
      </Text>
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.textButton} onPress={signUp}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <Button title="Back" onPress={() => navigation.navigate('Landing')} />
    </ScrollView>
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
  },
  emailInput: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 15,
  },
  emailInput2: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: '#F9908D',
    marginBottom: 15,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  },
});
