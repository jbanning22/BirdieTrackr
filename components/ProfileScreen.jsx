import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
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
import LargeButton from './button/LargeButton';
import myImage from '../assets/images/BasketBackground2.png';

const ProfileScreen = s => {
  const {signedIn, setSignedIn} = useContext(AuthContext);
  // const [userDetails, setUserDetails] = useState({});
  const [imageBool, setImageBool] = useState(false);
  const [imageData, setImageData] = useState([]);
  const {data: userDetails, isLoading, isError, error} = useGetUserDetails();

  const signOut = async () => {
    try {
      const signOutRes = await axios.post(
        'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/auth/signout',
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
                `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/users/${id}`,
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
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <View
          style={{
            marginBottom: 20,
          }}>
          <View
            style={{
              margin: 20,
              padding: 20,
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
            <View style={styles.box3}>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleChoosePhoto}>
                {imageBool ? (
                  <Image
                    source={{uri: imageData}}
                    style={{
                      height: 65,
                      width: 65,
                      borderRadius: 50,
                      // backgroundColor: 'white',
                    }}
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} color={'black'} size={30} />
                )}
              </TouchableOpacity>
              <View style={styles.box2}>
                <Text style={styles.dataFieldText}>
                  {userDetails?.firstName} {userDetails?.lastName}
                </Text>
                {/* </View> */}
                {/* </View> */}
                {/* <View style={{alignSelf: 'center'}}> */}
                <Text
                  style={{
                    fontFamily: 'Helvetica',
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#6B7280',
                  }}>
                  {userDetails?.city}, {userDetails?.state}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              margin: 10,
            }}>
            <View style={{margin: 10}}>
              <LargeButton buttonText="Log Out" onPress={signOut} />
            </View>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 100,
              }}>
              <TouchableOpacity onPress={deleteUser}>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  color={'red'}
                  size={14}
                  style={{margin: 30}}
                  testID={'trash-icon'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  box1: {
    backgroundColor: 'white',
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
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 0.25,
    marginRight: 30,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
    fontFamily: 'Satoshi-Medium',
  },
  dataFieldText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    padding: 5,
  },
  homeText: {
    fontSize: 36,
    fontWeight: '400',
    fontFamily: 'Satoshi-Medium',
    marginRight: 180,
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
  imageBackground: {
    height: '105%',
    width: '105%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
