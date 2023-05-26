import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import axios from 'axios';

const EditUserScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userState, setUserState] = useState('');
  const [city, setCity] = useState('');

  const editUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const editMeRes = await axios.patch(
        'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/users',
        {
          userName: userName,
          fistName: firstName,
          lastName: lastName,
          city: city,
          state: userState,
          password: password,
        },
        {
          headers: headers,
        },
      );
      await navigation.navigate('ProfileLanding');
    } catch (error) {
      throw new Error('Error editing user');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.box1}>
      <Text style={styles.singUpText}>Edit Profile</Text>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Username"
          style={styles.emailInput}
          value={userName}
          onChangeText={setUserName}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="First Name"
          style={styles.emailInput}
          value={firstName}
          onChangeText={setFirstName}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.emailInput}
          value={lastName}
          onChangeText={setLastName}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="City"
          style={styles.emailInput}
          value={city}
          onChangeText={setCity}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="State"
          style={styles.emailInput}
          value={userState}
          onChangeText={setUserState}
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
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.signUpButton} onPress={editUser}>
        <Text style={styles.textButton}>Edit</Text>
      </TouchableOpacity>
      <Button
        title="Back"
        onPress={() => navigation.navigate('ProfileLanding')}
      />
    </ScrollView>
  );
};

export default EditUserScreen;

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
    backgroundColor: '#52BEDB',
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
