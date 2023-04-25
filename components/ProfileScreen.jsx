import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({});
  const [scorecardData, setScorecardData] = useState([]);

  const signOut = async () => {
    try {
      const signOutRes = await axios.post(
        'http://localhost:3000/auth/signout',
        {},
      );
      console.log(signOutRes.data);
      if (signOutRes.status === 201) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('ReToken');
        await AsyncStorage.setItem('status', 'signedOut');
        // navigation.navigate('Auth', {screen: 'Landing'});
      }
    } catch (error) {
      console.log('error signing out', error.message);
    }
  };

  const getMe = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const getMeRes = await axios.get('http://localhost:3000/users/me', {
        headers,
      });
      console.log(getMeRes.data);
      setUserDetails(getMeRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getScorecards = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scoreC = await axios.get(`http://localhost:3000/scorecard`, {
        headers,
      });
      if (scoreC.data === []) {
        setScorecardData(['You have not recorded any rounds yet.']);
      } else {
        setScorecardData(scoreC.data);
      }
    } catch (error) {
      console.log('get Scorecard error is: ', error);
    }
  };

  useEffect(() => {
    getMe();
    getScorecards();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.box1}>
        {/* <Text style={styles.homeText}>Profile</Text> */}
        <View style={styles.box3}>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>picture</Text>
          </TouchableOpacity>
          <View style={styles.box2}>
            <Text style={styles.dataFieldText}>{userDetails.userName}</Text>
            <Text style={styles.dataFieldText}>
              {userDetails.firstName} {userDetails.lastName}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.box21}>
        {/* <Text style={styles.dataFieldText}>Rounds</Text>
        <Text style={styles.dataFieldText}>Courses</Text> */}
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.buttonText} onPress={signOut}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  box1: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  box2: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  box21: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 50,
  },
  box3: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  signUpButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'grey',
    marginRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    width: 80,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#DB6F52',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
    marginLeft: 150,
    marginTop: 20,
  },
  editButton: {
    width: 80,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#52BEDB',
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
    marginLeft: 150,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: '600',
    color: 'white',
  },
  dataFieldText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '400',
    padding: 10,
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 80,
  },
});
