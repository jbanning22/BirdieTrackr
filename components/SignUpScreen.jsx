import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
// import {authentication} from '../firebase/firebase-config';
// import {createUserWithEmailAndPassword} from 'firebase/auth';
// import {useDispatch} from 'react-redux';
// import {setSignedIn} from '../redux/signedInSlice';

const SignUpScreen = ({navigation}) => {
  //   const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const signUp = async () => {
    try {
      const signUpRes = await axios.post('http://localhost:3000/auth/signup', {
        email: email,
        password: password,
        username: username,
      });
      console.log('sign up res', signUpRes.data.access_token);
      if (signUpRes.status === 201) {
        const access_token = await signUpRes.data.access_token;
        await AsyncStorage.setItem('token', access_token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('error signing up', error);
    }
  };

  return (
    <View style={styles.box1}>
      <Text style={styles.singUpText}>Join the IDISC Community!</Text>
      <TextInput
        placeholder="Username"
        style={styles.emailInput}
        value={username}
        onChangeText={setUsername}
        clearButtonMode={'always'}
      />
      <TextInput
        placeholder="Email"
        style={styles.emailInput}
        value={email}
        onChangeText={setEmail}
        clearButtonMode={'always'}
      />
      <TextInput
        placeholder="Password"
        style={styles.loginTextInput}
        value={password}
        onChangeText={setPassword}
        clearButtonMode={'always'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.textButton} onPress={signUp}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <Button title="Back" onPress={() => navigation.navigate('Landing')} />
    </View>
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
    backgroundColor: '#E58315',
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
