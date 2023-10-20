import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LargeButton from './button/LargeButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import myImage from '../assets/images/BasketBackground2.png';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

const CreateThrow1 = ({navigation, route}) => {
  const {dist} = route.params;
  const [discName, setdiscName] = useState('');
  const [discColor, setDiscColor] = useState('');
  const [throwType, setThrowType] = useState('');
  const isDisabled = !discName || !discColor || !throwType;
  const retrieveUserData = async () => {
    try {
      const jsonUserData = await AsyncStorage.getItem('userData');
      return jsonUserData != null ? JSON.parse(jsonUserData) : null;
    } catch (error) {
      console.error('Error retrieving userData from AsyncStorage:', error);
      return null;
    }
  };

  let throwId = 0;
  const createThrow = async () => {
    try {
      const userData = await retrieveUserData();
      throwId = Math.max(...userData.throws.map(sc => sc.id), 0) + 1;
      const measuredThrow = {
        id: throwId,
        distance: dist,
        disc: discName,
        color: discColor,
        throwtype: throwType,
      };
      if (userData !== null) {
        userData.throws.push(measuredThrow);

        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        navigation.navigate('Throws1', {reset: true});

        console.log('measured throw added to userData.');
      } else {
        console.log('userData not found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error adding measured throws:', error);
    }
  };

  let message = '';
  if (dist < 50) {
    message = 'Gotta start somewhere!';
  } else if (dist >= 50 && dist < 100) {
    message = 'Nice rip!';
  } else if (dist >= 100 && dist < 200) {
    message = 'Great throw!';
  } else if (dist >= 200 && dist < 250) {
    message = 'Superb throw!';
  } else if (dist >= 250 && dist < 300) {
    message = 'Wow! That was far!';
  } else if (dist >= 300 && dist < 400) {
    message = 'Amazing Throw!';
  } else if (dist >= 400) {
    message = 'That was launched! Is your arm ok?';
  }

  // const createThrow = async () => {
  //   const newThrowData = [dist, discName, discColor, throwType];
  //   await AsyncStorage.setItem('measuredThrow', JSON.stringify(newThrowData));
  //   navigation.navigate('Throws1');
  // };
  return (
    <ImageBackground source={myImage} style={styles.imageBackground}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.backArrowParent}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ThrowsScreen1')}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.singUpText}>Measure Throw</Text>
        <View
          style={{
            marginTop: 2,
            backgroundColor: '#F9FAFB',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
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
        </View>
      </KeyboardAvoidingView>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.distance}>{dist} feet</Text>
        <Text style={styles.message}>{message}</Text>
        <LargeButton
          buttonText="Create Throw"
          onPress={createThrow}
          disabled={isDisabled}
        />
      </View>
    </ImageBackground>
  );
};

export default CreateThrow1;

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
    // marginBottom: 80,
    margin: 40,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 15,
  },
  header: {
    fontSize: 16,
    marginBottom: 5,
  },
  emailInput: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    margin: 15,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 18,
    color: 'white',
  },
  distance: {
    fontSize: 30,
    color: 'black',
    backgroundColor: 'white',
  },
  message: {
    fontSize: 18,
    marginTop: 30,
    marginBottom: 30,
    color: '#45B369',
    backgroundColor: 'white',
  },
  backArrowParent: {
    flexDirection: 'row',
    marginTop: 35,
    marginLeft: 15,
  },
  imageBackground: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
});
