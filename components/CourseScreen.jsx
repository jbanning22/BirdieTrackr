import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

// (GET) courses https://api.pdga.com/services/json/course
// (POST) login link: https://api.pdga.com/services/json/user/login

const CourseScreen = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [courses, setCourses] = useState(null);
  const [sessionId, setSessionId] = useState('');
  const [sessionName, setSessionName] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  const signIn = async () => {
    try {
      const signInData = await axios.post(
        'https://api.pdga.com/services/json/user/login',
        {
          username: 'Jack Banning 37590',
          password: 'Realdeal1!',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('signin data.data: ', signInData.data);
      setResponse(signInData.data);
      //   setSessionId(signInData.data.sessionId);
      return signInData;
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  const getCourses = async () => {
    console.log('getCourses called');
    try {
      const courses = await axios.get(
        'https://api.pdga.com/services/json/course?state_prov=VA',
        {
          headers: {
            //    'Content-Type': 'application/json',
            Cookie:
              'SSESSf1f85588bb869a1781d21eec9fef1bff=1l6qkenRKNsSUiHsICDiTN8d1KE3miCcv4XaIdjfPDM',
          },
        },
      );
      console.log(courses);
      console.log(courses.data);
      return courses;
    } catch (error) {
      console.log('get courses error is : ', error);
    }
  };

  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>Nearby Courses</Text>
      {/* call for rest API with data on courses based off extracted long and lat. */}
      <TouchableOpacity style={styles.loginButton} onPress={signIn}>
        <Text>Sign in</Text>
      </TouchableOpacity>
      <Text>{}</Text>
      <TouchableOpacity style={styles.loginButton} onPress={getCourses}>
        <Text>Get Courses</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 80,
  },
  loginButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52BEDB',
    marginBottom: 40,
    marginTop: 20,
  },
});
