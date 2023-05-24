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
import axios from 'axios';

const CreateThrowScreen = ({navigation, route}) => {
  const {dist} = route.params;
  //   const [value, setValue] = useState(42);
  //   const [distance, setDistance] = useState('');
  const [discName, setdiscName] = useState('');
  const [discColor, setDiscColor] = useState('');
  const [throwType, setThrowType] = useState('');
  const [throwData, setThrowData] = useState('');

  let message = '';
  if (dist < 50) {
    message = "That's a start!";
  } else if (dist >= 50 && dist < 100) {
    message = 'Nice rip!';
  } else if (dist >= 100 && dist < 200) {
    message = 'Great throw!';
  } else if (dist >= 200 && dist < 300) {
    message = 'Wow! That was far!';
  } else if (dist >= 300 && dist < 400) {
    message = 'Amazing Throw!';
  } else if (dist >= 400) {
    message = 'That was launched! Is your arm ok?';
  }
  const createThrow = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const measuredThrow = await axios.post(
        'http://localhost:3000/measure-throws',
        {
          disc: discName,
          distance: dist.toString(),
          throwtype: throwType,
          color: discColor,
        },
        {headers},
      );
      navigation.navigate('ThrowsScreen');
    } catch (error) {
      throw new Error('Error creating throw');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.box1}>
      <Text style={styles.singUpText}>Measure Throw</Text>
      <KeyboardAvoidingView>
        <TextInput
          placeholder="Disc Name"
          style={styles.emailInput}
          value={discName}
          onChangeText={setdiscName}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="Disc Color"
          style={styles.emailInput}
          value={discColor}
          onChangeText={setDiscColor}
          clearButtonMode={'always'}
        />
        <TextInput
          placeholder="Throw Type"
          style={styles.emailInput}
          value={throwType}
          onChangeText={setThrowType}
          clearButtonMode={'always'}
        />
      </KeyboardAvoidingView>
      <Text style={styles.distance}>{dist} feet</Text>

      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.signUpButton} onPress={createThrow}>
        <Text style={styles.textButton}>Create Throw</Text>
      </TouchableOpacity>
      <Button
        title="Back"
        onPress={() => navigation.navigate('ThrowsScreen')}
      />
    </ScrollView>
  );
};

export default CreateThrowScreen;

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
  distance: {
    fontSize: 30,
    color: 'black',
  },
  message: {
    fontSize: 18,
    marginTop: 30,
    color: '#DB6F52',
  },
});
