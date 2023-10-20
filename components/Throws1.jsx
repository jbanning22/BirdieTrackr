import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  Switch,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {Alert} from 'react-native';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';
import LargeButton from './button/LargeButton';
import {AuthContext} from '../AuthContext';

const Throws1 = ({navigation, route}) => {
  const reset = route.params;
  const [refresh, setRefresh] = useState(false);
  const [throwData, setThrowData] = useState({});
  const [isEnabled, setIsEnabled] = useState(false);
  const {setSignedIn, setOffline} = useContext(AuthContext);
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    retrieveUserData().then(userData => {
      if (userData !== null) {
        setThrowData(userData.throws);
      }
    });
  }, [reset, refresh]);

  const retrieveUserData = async () => {
    try {
      const jsonUserData = await AsyncStorage.getItem('userData');
      // console.log('data on throws1 is: ', jsonUserData);
      let result = jsonUserData != null ? JSON.parse(jsonUserData) : null;
      return result;
    } catch (error) {
      console.error('Error retrieving userData from AsyncStorage:', error);
      return null;
    }
  };

  const deleteThrow = async id => {
    Alert.alert(
      'Delete Throw',
      'Are you sure you want to delete this throw?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const jsonUserData = await AsyncStorage.getItem('userData');
              let userData =
                jsonUserData != null
                  ? JSON.parse(jsonUserData)
                  : {scorecards: [], throws: []};
              const indexToDelete = userData.throws.findIndex(
                item => item.id === id,
              );

              if (indexToDelete !== -1) {
                userData.throws.splice(indexToDelete, 1);
                await AsyncStorage.setItem(
                  'userData',
                  JSON.stringify(userData),
                );
                setRefresh(!refresh);
                console.log('Scorecard with id', id, 'deleted successfully.');
              } else {
                console.log(
                  'Scorecard with id',
                  id,
                  'not found in AsyncStorage.',
                );
              }
            } catch (error) {
              console.error('Error deleting scorecard:', error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => {
    const date = moment(item.createdAt).format('MMMM Do, YYYY');
    return (
      <View style={styles.flatListParent}>
        <View style={styles.flatlistStyle}>
          <Text style={styles.renderCourseName}>{item.distance} ft</Text>
          <Text style={styles.renderHoleText}>{item.disc}</Text>
          <Text style={styles.throwTypeText}>{item.throwtype}</Text>
          <Text style={styles.renderText}>{date}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteThrow(item.id)}>
          <FontAwesomeIcon
            icon={faTrashCan}
            color={'white'}
            size={12}
            style={{margin: 4}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const refreshAccess = async () => {
    setOffline(false);
    const reToken = await AsyncStorage.getItem('ReToken');
    try {
      const refresh = await axios.post(
        'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/auth/refresh',
        null,
        {
          headers: {
            Authorization: `Bearer ${reToken}`,
          },
        },
      );
      if (refresh.status === 201) {
        const access_token = await refresh.data.access_token;
        const refresh_token = await refresh.data.refresh_token;

        await AsyncStorage.setItem('token', access_token);
        await AsyncStorage.setItem('ReToken', refresh_token);
        setSignedIn(true);
        // clearStorage();
        return refresh.data;
      } else {
        setSignedIn(false);
      }
    } catch (error) {
      setSignedIn(false);
      console.log('error signing in', error);
    }
  };

  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    refreshAccess();
    await setSignedIn(false);
  };

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <Text style={styles.titleText}>Throws</Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.offlineText}>Offline?</Text>
          <Switch
            trackColor={{false: '#2D6061'}}
            thumbColor={isEnabled ? 'white' : '#2D6061'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: 570,
            width: windowWidth,
          }}>
          {throwData && throwData.length ? (
            <FlatList
              renderItem={renderItem}
              data={throwData}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                backgroundColor: 'white',
              }}>
              You have not recorded any throws yet.
            </Text>
          )}
        </View>
        <View style={{alignSelf: 'center'}}>
          <LargeButton
            buttonText="Measure a Throw"
            onPress={() => navigation.navigate('ThrowsScreen1')}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Throws1;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  box1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 36,
    alignSelf: 'center',
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'white',
  },
  flatListParent: {
    flexDirection: 'row',
    backgroundColor: '#2D6061',
    justifyContent: 'center',
    alignContent: 'flex-start',
    borderRadius: 8,
    marginBottom: 10,
  },
  measureThrowButton: {
    width: 327,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  flatlistStyle: {
    width: 280,
    margin: 10,
  },
  renderItemStyle: {
    flexDirection: 'column',
  },
  renderCourseName: {
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Satoshi-Medium',
  },
  renderHoleText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Satoshi-Medium',
  },
  throwTypeText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Satoshi-Medium',
  },
  renderText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
    color: 'white',
    fontFamily: 'Satoshi-Medium',
  },
  offlineText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    alignSelf: 'center',
    marginRight: 5,
    backgroundColor: 'white',
  },
});
