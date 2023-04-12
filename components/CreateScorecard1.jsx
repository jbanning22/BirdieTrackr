import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const CreateScorecard1 = ({navigation}) => {
  const [courseLength, setCourseLength] = useState(0);
  const [courseName, setCourseName] = useState('');

  function setLength9() {
    setCourseLength(9);
  }
  function setLength18() {
    setCourseLength(18);
  }
  return (
    <View style={styles.box1}>
      <Text style={styles.questionText}>Name of the course?</Text>
      <TextInput
        placeholder="Course Name"
        style={styles.loginTextInput}
        value={courseName}
        onChangeText={setCourseName}
      />
      <Text style={styles.questionText}>How Many Holes?</Text>
      <TouchableOpacity style={styles.lengthButton}>
        <Text style={styles.textButton} onPress={setLength9}>
          9
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.lengthButton}>
        <Text style={styles.textButton} onPress={setLength18}>
          18
        </Text>
      </TouchableOpacity>
      <View style={styles.box2}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Scorecards')}>
          <Text style={styles.textButton}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateScorecard1;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
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
  lengthButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0CBBEE',
    marginTop: 35,
    marginBottom: 15,
  },
  backButton: {
    width: 80,
    height: 40,
    padding: 5,
    marginTop: 50,
  },
  textButton: {
    alignSelf: 'center',
    alignItems: 'center',
  },
});
