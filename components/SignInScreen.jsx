import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faLock,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  // faEnvelope,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons';

const SignInScreen = ({navigation}) => {
  const {setSignedIn} = useContext(AuthContext);
  const [secureEntry, setSecureEntry] = useState(true);
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
      <View
        style={{
          flex: 1,
          alignSelf: 'flex-start',
          marginLeft: 20,
          marginTop: 60,
          marginBottom: 140,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.homeText}>
        Sign In to <Text style={{color: '#45B369'}}>DG Scorecard</Text>
      </Text>
      <KeyboardAvoidingView>
        <View style={styles.inputView}>
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{color: 'grey', marginLeft: 15, alignSelf: 'center'}}
          />
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
        </View>
        <Text style={{color: 'red', padding: 5}}>{validationErrors.email}</Text>
        <View style={styles.passView}>
          <FontAwesomeIcon
            icon={faLock}
            style={{
              color: 'grey',
              marginLeft: 15,
              alignSelf: 'center',
            }}
          />
          <TextInput
            placeholder="Password"
            style={styles.loginTextInput1}
            value={formData.password}
            onChangeText={text => setFormData({...formData, password: text})}
            autoCapitalize={'none'}
            secureTextEntry={secureEntry}
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <FontAwesomeIcon
              icon={secureEntry ? faEyeSlash : faEye}
              size={18}
              style={{
                color: 'grey',
                marginTop: 20,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          margin: 15,
        }}>
        <TouchableOpacity activeOpacity={1}>
          <Text style={{fontFamily: 'Satoshi-Medium'}}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={signIn}>
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.legalText} numberOfLines={2}>
          By signing in, you agree to the{' '}
          <Text style={styles.legalNames}>DG Scorecard Terms & Conditions</Text>{' '}
          and <Text style={styles.legalNames}>Privacy Policy</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  box1: {
    alignItems: 'center',
  },
  homeText: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    marginBottom: 80,
  },
  loginButton: {
    width: 327,
    height: 60,
    justifyContent: 'center',
    fontFamily: 'Satoshi-Medium',
    alignItems: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 12,
    marginBottom: 40,
    // marginTop: 60,
  },
  loginTextInput2: {
    flex: 1,
    width: 327,
    height: 60,
    padding: 10,
    marginBottom: 8,
    marginTop: 10,
    fontFamily: 'Satoshi-Medium',
    alignSelf: 'center',
    marginLeft: 10,
  },
  loginTextInput1: {
    flex: 1,
    width: 327,
    height: 60,
    padding: 10,
    marginTop: 10,
    marginBottom: 8,
    fontFamily: 'Satoshi-Medium',
    alignSelf: 'center',
    marginLeft: 10,
  },
  inputView: {
    width: 327,
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  passView: {
    width: 327,
    height: 56,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  textButton: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Satoshi-Medium',
    color: 'white',
  },
  legalNames: {
    fontWeight: '400',
    color: 'black',
  },
  legalText: {
    fontSize: 14,
    fontFamily: 'Satoshi-Medium',
    color: '#6B7280',
    paddingBottom: 5,
    marginTop: 150,
    textAlign: 'center',
  },
});
