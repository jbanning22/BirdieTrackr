import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {launchImageLibrary} from 'react-native-image-picker';
// import {Platform} from 'react-native';
// import {PERMISSIONS, request} from 'react-native-permissions';

const ProfileScreen = ({navigation}) => {
  const {signedIn, setSignedIn} = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({});
  const [scorecardData, setScorecardData] = useState([]);
  const [imageBool, setImageBool] = useState(false);
  const [imageData, setImageData] = useState([]);

  const signOut = async () => {
    try {
      const signOutRes = await axios.post(
        'http://192.168.1.154:3000/auth/signout',
        {},
      );
      //   console.log(signOutRes.data);
      if (signOutRes.status === 201) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('ReToken');
        setSignedIn(false);
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
      const getMeRes = await axios.get('http://192.168.1.154:3000/users/me', {
        headers,
      });
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
      const scoreC = await axios.get(`http://192.168.1.154:3000/scorecard`, {
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

  const getProfilePic = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        setImageData(value);
        setImageBool(true);
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoosePhoto = async () => {
    const options = {
      noData: true,
    };
    const permission = checkCameraRollPermission();
    if (permission === 'denied') {
      requestCameraRollPermission();
    } else {
      await launchImageLibrary(options, async response => {
        if (response.assets) {
          setImageData(response.assets[0].uri);
          setImageBool(true);
          await AsyncStorage.setItem(
            'profileImageData',
            response.assets[0].uri,
          );
        }
      });
    }
  };

  const requestCameraRollPermission = async () => {
    if (Platform.OS === 'ios') {
      const results = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      console.log('request camera roll permisson result: ', results);
      return results;
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      return result;
    }
  };

  const checkCameraRollPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      console.log('check camera roll permisson result: ', result);
      return result;
    } else {
      const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      return result;
    }
  };

  useEffect(() => {
    getMe();
    getScorecards();
    getProfilePic('profileImageData');
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.box1}>
        <Text style={styles.homeText}>{userDetails.userName}</Text>
        <View style={styles.box3}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={handleChoosePhoto}>
            {imageBool ? (
              <Image
                source={{uri: imageData}}
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                }}
              />
            ) : (
              <FontAwesomeIcon icon={faUser} color={'black'} size={34} />
            )}
          </TouchableOpacity>
          <View style={styles.box2}>
            {/* <Text style={styles.dataFieldText}>{userDetails.userName}</Text> */}
            <Text style={styles.dataFieldText}>
              {userDetails.firstName} {userDetails.lastName}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.box21}>
        {/* <Text style={styles.dataFieldText}>{scorecardData[0].courseName}</Text> */}
        {/* <Text style={styles.dataFieldText}>Courses</Text> */}
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
    borderWidth: 0.25,
    // backgroundColor: 'grey',
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
    fontSize: 36,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 80,
  },
});
