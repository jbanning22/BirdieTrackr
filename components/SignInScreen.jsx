import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  Modal,
  Pressable,
  Platform,
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
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  // faEnvelope,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-regular-svg-icons';
import LargeButton from './button/LargeButton';

const SignInScreen = ({navigation}) => {
  const {setSignedIn} = useContext(AuthContext);
  const [secureEntry, setSecureEntry] = useState(true);
  const [secureNewEntry, setNewSecureEntry] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [resetFormData, setResetFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [resetValidationErrors, setResetValidationErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const isResetDisabled = !resetValidationErrors.email;
  // const isDisabled = !courseName;

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
          'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/auth/signin',
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

  const handleForgotPassword = async () => {
    setModalVisible(true);
  };

  const resetPassword = async () => {
    setModalVisible(!modalVisible);
    try {
      const resetPassword = await axios.patch(
        'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/auth/reset-password',
        {
          email: resetFormData.email,
          password: resetFormData.password,
        },
      );
      if (resetPassword.status === 200) {
        const access_token = await resetPassword.data.access_token;
        const refresh_token = await resetPassword.data.refresh_token;

        await AsyncStorage.setItem('token', access_token);
        await AsyncStorage.setItem('ReToken', refresh_token);
        await setSignedIn(true);
      }
    } catch (error) {
      throw new Error('Error changing password');
    }
  };

  const validateEmail = () => {
    const isValid = /\S+@\S+\.\S+/.test(formData.email);
    setValidationErrors({
      ...validationErrors,
      email: isValid ? '' : 'Email is required and must be valid.',
    });
  };

  const validateResetEmail = () => {
    const isResetValid = /\S+@\S+\.\S+/.test(resetFormData.email);
    setResetValidationErrors({
      ...resetValidationErrors,
      email: isResetValid ? '' : 'Email is required and must be valid.',
    });
  };

  return (
    <SafeAreaView style={styles.box1}>
      <View
        style={{
          // flex: 1,
          alignSelf: 'flex-start',
          marginLeft: 20,
          marginTop: 20,
          marginBottom: 100,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Landing')}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>
      </View>
      <Text style={styles.homeText}>
        Sign In to <Text style={{color: '#45B369'}}>BirdieTrackr</Text>
      </Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputView}>
          <FontAwesomeIcon
            icon={faEnvelope}
            style={{color: 'grey', marginLeft: 15, alignSelf: 'center'}}
          />
          <TextInput
            placeholder="Email"
            style={styles.loginTextInput1}
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
        <TouchableOpacity activeOpacity={1} onPress={handleForgotPassword}>
          <Text style={{fontFamily: 'Satoshi-Medium'}}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={signIn}>
        <Text style={styles.textButton}>Sign in</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.legalText} numberOfLines={2}>
          By signing in, you agree to the{' '}
          <Text style={styles.legalNames}>BirdieTrackr Terms & Conditions</Text>{' '}
          and <Text style={styles.legalNames}>Privacy Policy</Text>.
        </Text>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalCloseButton}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size={24}
                    style={{color: 'grey'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  style={{color: 'grey', marginLeft: 15, alignSelf: 'center'}}
                />
                <TextInput
                  placeholder="Email"
                  style={styles.loginTextInput1}
                  value={resetFormData.email}
                  onChangeText={text =>
                    setResetFormData({...resetFormData, email: text})
                  }
                  onBlur={validateResetEmail}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                />
              </View>
              <View style={styles.errorMessageContainer}>
                {resetValidationErrors ? (
                  <Text style={styles.errorMessageText}>
                    {resetValidationErrors.email}
                  </Text>
                ) : null}
              </View>
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
                  placeholder="New password"
                  style={styles.loginTextInput1}
                  value={resetFormData.password}
                  onChangeText={text =>
                    setResetFormData({...resetFormData, password: text})
                  }
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
              <Text></Text>
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
                  placeholder="Confirm password"
                  style={styles.loginTextInput1}
                  value={resetFormData.confirmPassword}
                  onChangeText={text =>
                    setResetFormData({...resetFormData, confirmPassword: text})
                  }
                  autoCapitalize={'none'}
                  secureTextEntry={secureNewEntry}
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setNewSecureEntry(!secureNewEntry)}>
                  <FontAwesomeIcon
                    icon={secureNewEntry ? faEyeSlash : faEye}
                    size={18}
                    style={{
                      color: 'grey',
                      marginTop: 20,
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <LargeButton
                buttonText="Reset Password"
                onPress={resetPassword}
                customStyles={{width: 180, height: 44}}
                disabled={!isResetDisabled}
              />
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
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
    fontFamily: 'Satoshi-Medium',
  },
  legalText: {
    fontSize: 14,
    fontFamily: 'Satoshi-Medium',
    color: '#6B7280',
    paddingBottom: 5,
    paddingHorizontal: 16,
    marginTop: 150,
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
    padding: 10,
  },
  errorMessageContainer: {
    height: 15,
    justifyContent: 'center',
  },
  errorMessageText: {
    color: 'red',
  },
});
