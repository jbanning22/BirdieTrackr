import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthContext} from '../AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faUser,
  faEnvelope,
  faCity,
  faLock,
} from '@fortawesome/free-solid-svg-icons';
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons';

const SignUpScreen = ({navigation}) => {
  const {setSignedIn} = useContext(AuthContext);
  const [validationErrors, setValidationErrors] = useState({});
  const [secureEntry, setSecureEntry] = useState(true);
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
      // eslint-disable-next-line no-console
      console.log('Please fix the form errors before signing up.');
      return;
    } else {
      try {
        const signUpRes = await axios.post(
          'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/auth/signup',
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
        // eslint-disable-next-line no-console
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
      <View style={styles.backIcon}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.singUpText}>
        Welcome to <Text style={{color: '#45B369'}}>DG Scorecard</Text>
      </Text>
      <Text style={styles.createAccountText}>
        Create a commitment-free profile to explore products.
      </Text>
      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <View style={styles.inputStyle}>
            <FontAwesomeIcon
              icon={faUser}
              style={{
                color: 'grey',
                alignSelf: 'center',
                margin: 10,
              }}
            />
            <TextInput
              placeholder="Username"
              style={{flex: 1}}
              value={formData.userName}
              onChangeText={text => setFormData({...formData, userName: text})}
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputStyle}>
            <FontAwesomeIcon
              icon={faUser}
              style={{color: 'grey', alignSelf: 'center', margin: 10}}
            />
            <TextInput
              placeholder="First Name"
              style={{flex: 1}}
              value={formData.firstName}
              onChangeText={text => setFormData({...formData, firstName: text})}
              autoCorrect={false}
            />
          </View>
          <View style={styles.inputStyle}>
            <FontAwesomeIcon
              icon={faUser}
              style={{color: 'grey', alignSelf: 'center', margin: 10}}
            />
            <TextInput
              placeholder="Last Name"
              style={{flex: 1}}
              value={formData.lastName}
              onChangeText={text => setFormData({...formData, lastName: text})}
              autoCorrect={false}
            />
          </View>
          <View
            style={
              validationErrors.email ? styles.inputStyle2 : styles.inputStyle
            }>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{color: 'grey', alignSelf: 'center', margin: 10}}
            />
            <TextInput
              placeholder="Email"
              style={{flex: 1}}
              value={formData.email}
              onBlur={validateEmail}
              onChangeText={text => setFormData({...formData, email: text})}
              autoCorrect={false}
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.inputStyle}>
            <FontAwesomeIcon
              icon={faCity}
              style={{color: 'grey', alignSelf: 'center', margin: 10}}
            />
            <TextInput
              placeholder="City"
              style={{flex: 1}}
              value={formData.city}
              onChangeText={text => setFormData({...formData, city: text})}
            />
          </View>
          <View style={styles.inputStyle}>
            <FontAwesomeIcon
              icon={faEnvelope}
              style={{color: 'grey', alignSelf: 'center', margin: 10}}
            />
            <TextInput
              placeholder="State"
              style={{flex: 1}}
              value={formData.userState}
              onChangeText={text => setFormData({...formData, state: text})}
            />
          </View>
          <View style={styles.inputStyle}>
            <FontAwesomeIcon
              icon={faLock}
              style={{color: 'grey', alignSelf: 'center', margin: 10}}
            />
            <TextInput
              placeholder="Password"
              style={{flex: 1}}
              value={formData.password}
              onChangeText={text => setFormData({...formData, password: text})}
              secureTextEntry={secureEntry}
              autoCorrect={false}
            />
            <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
              <FontAwesomeIcon
                icon={secureEntry ? faEyeSlash : faEye}
                size={18}
                style={{
                  color: 'grey',
                  marginTop: 16,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Text style={{color: 'red', marginTop: 10}}>
        {validationErrors.email}
      </Text>
      <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
        <Text style={styles.textButton}>Sign Up</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.legalText} numberOfLines={2}>
          By signing up, you agree to the{' '}
          <Text style={styles.legalNames}>DG Scorecard Terms & Conditions</Text>{' '}
          and <Text style={styles.legalNames}>Privacy Policy</Text>.
        </Text>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  box1: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  singUpText: {
    fontSize: 30,
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    marginTop: 5,
    alignSelf: 'center',
  },
  backIcon: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 50,
  },
  createAccountText: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 17,
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
    margin: 5,
  },
  signUpButton: {
    width: 327,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Satoshi-Medium',
    alignItems: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 12,
    marginBottom: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Satoshi-Medium',
    color: 'white',
  },
  loginTextInput: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
  },

  inputView: {
    width: 327,
    height: 56,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  inputStyle: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: 'white',
    margin: 10,
    width: 327,
    height: 50,
  },
  inputStyle2: {
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#F9908D',
    width: 327,
    height: 50,
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
    textAlign: 'center',
    marginTop: 40,
  },
});
