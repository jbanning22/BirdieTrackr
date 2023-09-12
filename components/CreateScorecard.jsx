import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQueryClient} from '@tanstack/react-query';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import myImage from '../assets/images/BasketBackground2.png';
import LargeButton from './button/LargeButton';

const CreateScorecard = ({navigation}) => {
  const [courseLength, setCourseLength] = useState(0);
  const [courseName, setCourseName] = useState('');
  const [active9Button, setActive9Button] = useState(false);
  const [active18Button, setActive18Button] = useState(false);
  const queryClient = useQueryClient();

  function setLength9() {
    setCourseLength(9);
    setActive9Button(true);
    setActive18Button(false);
  }
  function setLength18() {
    setCourseLength(18);
    setActive18Button(true);
    setActive9Button(false);
  }

  const createScorecard = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scorecard = await axios.post(
        'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/scorecard',
        {courseLength: courseLength, courseName: courseName},
        {headers},
      );
      await navigation.navigate('FullScorecard', {
        id: scorecard.data.id,
      });
      queryClient.invalidateQueries('scorecardData');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Scorecard')}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Where are you playing?</Text>
        </View>
        <View
          style={{
            margin: 20,
            marginTop: 2,
            backgroundColor: '#F9FAFB',
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
          <Text style={styles.questionText}>Name of the Course</Text>
          <KeyboardAvoidingView>
            <TextInput
              placeholder="Course Name"
              style={styles.loginTextInput}
              value={courseName}
              onChangeText={setCourseName}
            />
          </KeyboardAvoidingView>
          <Text style={styles.questionText}>How Many Holes?</Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={
                active9Button ? styles.lengthButton2 : styles.lengthButton1
              }
              activeOpacity={0.3}
              onPress={setLength9}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                active18Button ? styles.lengthButton2 : styles.lengthButton1
              }
              activeOpacity={0.3}
              onPress={setLength18}>
              <Text style={styles.buttonText}>18</Text>
            </TouchableOpacity>
          </View>
        </View>
        <LargeButton buttonText="Create Scorecard" onPress={createScorecard} />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateScorecard;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Satoshi-Medium',
    // textAlign: 'center',
    flex: 1,
    margin: 6,
    marginLeft: 45,
  },
  questionText: {
    fontSize: 18,
    color: '#909090',
    fontWeight: '400',
    fontFamily: 'Satoshi-Medium',
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  loginTextInput: {
    height: 50,
    width: 300,
    padding: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  createScorecardButton: {
    width: 327,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 14,
  },
  createScorecardText: {
    fontFamily: 'Satoshi-Medium',
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  lengthButton1: {
    width: 104,
    height: 32,
    justifyContent: 'center',
    backgroundColor: '#9CA3AF',
    margin: 35,
    borderRadius: 8,
  },
  lengthButton2: {
    width: 104,
    height: 32,
    justifyContent: 'center',
    backgroundColor: '#2D6061',
    margin: 35,
    borderRadius: 8,
  },
  backButton: {
    width: 80,
    height: 40,
    padding: 5,
    marginTop: 50,
  },
  buttonText: {
    alignSelf: 'center',
    alignItems: 'center',
    color: 'white',
    fontWeight: '400',
    fontSize: 22,
  },
});
