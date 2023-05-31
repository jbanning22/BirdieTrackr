import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {check, request} from 'react-native-permissions';
import {PERMISSIONS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {launchImageLibrary} from 'react-native-image-picker';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {Alert} from 'react-native';
import {useGetUserDetails} from './hooks/getUserDataQuery';

const ProfileScreen = ({navigation}) => {
  const {signedIn, setSignedIn} = useContext(AuthContext);
  // const [userDetails, setUserDetails] = useState({});
  const [imageBool, setImageBool] = useState(false);
  const [imageData, setImageData] = useState([]);
  const {data: userDetails, isLoading, isError, error} = useGetUserDetails();

  const signOut = async () => {
    try {
      const signOutRes = await axios.post(
        'http://ec2-54-87-189-240.compute-1.amazonaws.com.154:3000/auth/signout',
        {},
      );
      if (signOutRes.status === 201) {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('ReToken');
        await setSignedIn(false);
      }
    } catch (error) {
      throw new Error('Error signing out');
    }
  };

  // const getMe = async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //   };
  //   try {
  //     const getMeRes = await axios.get(
  //       'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/users/me',
  //       {
  //         headers,
  //       },
  //     );
  //     setUserDetails(getMeRes.data);
  //   } catch (error) {
  //     console.error('Error getting user details: ', error);
  //   }
  // };

  const deleteUser = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const id = userDetails.id;
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete this account? You will not be able to access this account in the future.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await axios.delete(
                `http://ec2-54-87-189-240.compute-1.amazonaws.com68.1.154:3000/users/${id}`,
                {
                  headers,
                },
              );
              await setSignedIn(false);
            } catch (error) {
              throw new Error('Error deleting user');
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const getProfilePic = async key => {
    try {
      const value = await AsyncStorage.getItem('profileImageData');
      if (value !== null) {
        setImageData(value);
        setImageBool(true);
        return value;
      }
    } catch (error) {
      throw new Error('Error getting profile pic');
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
      return results;
    } else {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      return result;
    }
  };

  const checkCameraRollPermission = async () => {
    if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      return result;
    } else {
      const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      return result;
    }
  };
  // useEffect(() => {
  //   getMe();
  // }, []);

  useEffect(() => {
    getProfilePic('profileImageData');
  }, [imageData]);

  return (
    <SafeAreaView style={styles.box1}>
      <View
        style={{
          marginBottom: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.homeText}>{userDetails?.userName}</Text>
        </View>
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
            <Text style={styles.dataFieldText}>
              {userDetails?.firstName} {userDetails?.lastName}
            </Text>
          </View>
        </View>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Text style={{padding: 2, fontSize: 18, fontWeight: '400'}}>
          Located in: {userDetails?.city}, {userDetails?.state}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteUser}>
          <FontAwesomeIcon
            icon={faTrashCan}
            color={'red'}
            size={14}
            style={{margin: 30}}
            testID={'trash-icon'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.buttonText} onPress={signOut}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  box1: {
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
    borderColor: '#DB6F52',
    borderWidth: 2,
  },
  box22: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 50,
    borderColor: '#52BEDB',
    borderWidth: 2,
  },
  box3: {
    flexDirection: 'row',
    alignContent: 'center',
    padding: 10,
  },
  roundsText: {
    fontSize: 20,
    color: '#DB6F52',
    fontWeight: '500',
    marginBottom: 5,
    alignSelf: 'center',
  },
  throwsText: {
    fontSize: 20,
    color: '#52BEDB',
    fontWeight: '500',
    marginBottom: 5,
    alignSelf: 'center',
  },
  signUpButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 0.25,
    marginRight: 30,
    padding: 5,
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
    marginRight: 180,
    padding: 20,
  },
  flatListParent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    marginBottom: 5,
    marginTop: 10,
  },
  flatlistStyle: {
    width: 250,
    marginLeft: 15,
    alignContent: 'center',
    alignSelf: 'center',
  },
  renderItemStyle: {
    flexDirection: 'column',
  },
  renderCourseName: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  renderHoleText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  renderText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '300',
    padding: 1,
  },
});
