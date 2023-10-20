import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ImageBackground,
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

const CreateScorecard1 = ({navigation}) => {
  const [scoreCard, setScoreCard] = useState(null);
  const [courseName, setCourseName] = useState('');
  const isDisabled = !courseName;

  const initializeScoreCard = holes => {
    return Array.from({length: holes}, (_, index) => ({
      holeNumber: index + 1,
      par: 3,
      strokes: 3,
    }));
  };

  const init9HoleScoreCard = () => {
    const newScoreCard = initializeScoreCard(9);
    setScoreCard(newScoreCard);
    navigation.navigate('EditScorecard', {
      scoreCard: newScoreCard,
      courseName: courseName,
    });
  };

  const init18HoleScoreCard = () => {
    const newScoreCard = initializeScoreCard(18);
    setScoreCard(newScoreCard);
    navigation.navigate('EditScorecard', {
      scoreCard: newScoreCard,
      courseName: courseName,
    });
  };

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'white',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Scorecards1')}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              style={{marginLeft: 10, backgroundColor: 'white'}}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Choose a Scorecard!</Text>
        </View>

        <View
          style={{
            margin: 20,
            marginBottom: 10,
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
          <Text style={styles.questionText}>Enter your course name</Text>
          <KeyboardAvoidingView>
            <TextInput
              placeholder="Course Name"
              style={styles.loginTextInput}
              value={courseName}
              onChangeText={setCourseName}
            />
          </KeyboardAvoidingView>
        </View>

        <View style={styles.cardStyle}>
          <LargeButton
            buttonText="Create 9 Hole Scorecard"
            onPress={init9HoleScoreCard}
            disabled={isDisabled}
          />
          <LargeButton
            buttonText="Create 18 Hole Scorecard"
            onPress={init18HoleScoreCard}
            disabled={isDisabled}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateScorecard1;

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
    fontSize: 26,
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    // textAlign: 'center',
    backgroundColor: 'white',
    flex: 1,
    margin: 6,
    marginLeft: 45,
  },
  questionText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
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
    margin: 10,
    marginVertical: 16,
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
  cardStyle: {
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
    marginBottom: 250,
  },
});
