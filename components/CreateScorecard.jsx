import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';

const CreateScorecard = ({navigation}) => {
  const [courseLength, setCourseLength] = useState(0);
  const [courseName, setCourseName] = useState('');
  const [active9Button, setActive9Button] = useState(false);
  const [active18Button, setActive18Button] = useState(false);
  const [scorecardData, setScorecardData] = useState({});

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
        'http://192.168.1.154:3000/scorecard',
        {courseLength: courseLength, courseName: courseName},
        {headers},
      );
      navigation.navigate('FullScorecard', {
        id: scorecard.data.id,
      });
      return setScorecardData(scorecard.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.box1}>
      <Text style={styles.questionText}>Name of the course?</Text>
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
          style={active9Button ? styles.lengthButton2 : styles.lengthButton1}
          activeOpacity={0.3}
          onPress={setLength9}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>Or</Text>
        <TouchableOpacity
          style={active18Button ? styles.lengthButton2 : styles.lengthButton1}
          activeOpacity={0.3}
          onPress={setLength18}>
          <Text style={styles.buttonText}>18</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.createScorecardButton}
        onPress={createScorecard}>
        <Text style={styles.createScorecardText}>Create Scorecard</Text>
      </TouchableOpacity>
      <View style={styles.box2}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Scorecard')}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreateScorecard;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  box2: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 20,
    marginTop: 20,
  },
  loginTextInput: {
    height: 50,
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    marginTop: 10,
  },
  createScorecardButton: {
    justifyContent: 'center',
    alignContent: 'center',
    height: 60,
    width: 200,
    backgroundColor: '#52BEDB',
    padding: 10,
    marginTop: 80,
    borderRadius: 10,
  },
  createScorecardText: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
    color: 'white',
  },
  lengthButton1: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB6F52',
    margin: 35,
    marginBottom: 15,
    borderRadius: 25,
  },
  lengthButton2: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52BEDB',
    margin: 35,
    marginBottom: 15,
    borderRadius: 25,
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
  backButtonText: {
    color: 'black',
    alignSelf: 'center',
    alignItems: 'center',
  },
  orText: {
    alignSelf: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: '400',
    fontSize: 25,
    marginTop: 18,
  },
});
