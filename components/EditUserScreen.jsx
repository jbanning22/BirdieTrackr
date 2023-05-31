import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const EditUserScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    password: '',
    firstName: '',
    lastName: '',
    userName: '',
    city: '',
    state: '',
  });

  const queryClient = useQueryClient();

  const editUser = useMutation(
    async formData => {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const editMeRes = await axios.patch(
        'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/users',
        formData,
        {
          headers: headers,
        },
      );
      await navigation.navigate('ProfileLanding');

      return editMeRes.data;
    },
    {
      onError: error => {
        console.error('Error editing user: ', error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries('userData');
      },
    },
  );

  return (
    <ScrollView contentContainerStyle={styles.box1}>
      <Text style={styles.singUpText}>Edit Profile</Text>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Username"
          style={styles.emailInput}
          value={formData.userName}
          onChangeText={text => setFormData({...formData, userName: text})}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="First Name"
          style={styles.emailInput}
          value={formData.firstName}
          onChangeText={text => setFormData({...formData, firstName: text})}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.emailInput}
          value={formData.lastName}
          onChangeText={text => setFormData({...formData, lastName: text})}
          clearButtonMode={'always'}
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
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => editUser.mutate(formData)}>
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
