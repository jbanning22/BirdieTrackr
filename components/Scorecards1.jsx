import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Switch,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faExclamation} from '@fortawesome/free-solid-svg-icons/faExclamation';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';
import LargeButton from './button/LargeButton';
import {AuthContext} from '../AuthContext';

const Scorecard1 = ({navigation, route}) => {
  // const windowHeight = Dimensions.get('window').height;
  const reset = route.params;
  const windowWidth = Dimensions.get('window').width;
  const [refresh, setRefresh] = useState(false);
  const [scorecardData, setScorecardData] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const {setSignedIn, setOffline} = useContext(AuthContext);

  useEffect(() => {
    retrieveUserData().then(userData => {
      if (userData !== null) {
        setScorecardData(userData.scorecards);
      }
    });
  }, [reset, refresh]);
  const retrieveUserData = async () => {
    try {
      const jsonUserData = await AsyncStorage.getItem('userData');
      // console.log('Async is: ', jsonUserData);
      let result = jsonUserData != null ? JSON.parse(jsonUserData) : null;
      return result;
    } catch (error) {
      console.error('Error retrieving userData from AsyncStorage:', error);
      return null;
    }
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
        return refresh.data;
      } else {
        setSignedIn(false);
      }
    } catch (error) {
      setSignedIn(false);
      console.log('error signing in', error);
    }
  };

  const handleScorecardPressed = (courseName, scoreFromList) => {
    navigation.navigate('EditScorecard', {
      scoreCard: scoreFromList.scorecardData,
      scorecardID: scoreFromList.id,
      courseName,
      previousRouteName: 'Scorecards1',
    });
  };

  const deleteScorecard = async id => {
    Alert.alert(
      'Delete Scorecard',
      'Are you sure you want to delete this scorecard?',
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
              const indexToDelete = userData.scorecards.findIndex(
                item => item.id === id,
              );

              if (indexToDelete !== -1) {
                userData.scorecards.splice(indexToDelete, 1);
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
    const {scorecardData} = item;
    const totalScore = scorecardData?.reduce((acc, hole) => {
      return acc + (hole.strokes - hole.par);
    }, 0);
    const icon = item.isCompleted ? (
      <FontAwesomeIcon
        icon={faCheck}
        color={'white'}
        size={12}
        style={{margin: 8}}
      />
    ) : (
      <FontAwesomeIcon
        icon={faExclamation}
        color={'white'}
        size={12}
        style={{margin: 8}}
      />
    );
    return (
      <View style={styles.flatListItemContainer}>
        <TouchableOpacity
          onPress={() =>
            handleScorecardPressed(item.courseName, item, item.id)
          }>
          <View style={styles.flatlistTextItemStyle}>
            <Text style={styles.renderCourseName}>{item.courseName}</Text>
            <Text style={styles.renderHoleText}>
              {scorecardData?.length} Holes
            </Text>
            <Text style={styles.renderText}>{date}</Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginRight: 5,
          }}>
          {icon}
          <Text style={styles.renderScore}>{totalScore}</Text>
          <TouchableOpacity onPress={() => deleteScorecard(item.id)}>
            <FontAwesomeIcon
              icon={faTrashCan}
              color={'white'}
              size={12}
              style={{margin: 8}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    refreshAccess();
    await setSignedIn(false);
  };

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <Text
          style={{
            fontSize: 34,
            fontWeight: '600',
            fontFamily: 'Satoshi-Medium',
            alignSelf: 'center',
            backgroundColor: 'white',
            color: 'black',
          }}>
          Scorecards
        </Text>
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
          {Array.isArray(scorecardData) && scorecardData.length > 0 ? (
            <FlatList
              renderItem={renderItem}
              data={scorecardData}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
            />
          ) : (
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                backgroundColor: 'white',
              }}>
              You have not recorded any rounds yet.
            </Text>
          )}
        </View>

        <View
          style={{
            alignSelf: 'center',
          }}>
          <LargeButton
            buttonText="Create Scorecard"
            onPress={() => navigation.navigate('CreateScorecard1')}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Scorecard1;

const styles = StyleSheet.create({
  imageBackground: {
    resizeMode: 'cover',
  },
  box1: {
    backgroundColor: 'white',
  },
  flatListItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#2D6061',
    borderRadius: 10,
    marginBottom: 10,
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Satoshi-Medium',
    marginBottom: 15,
    color: 'black',
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
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  flatlistTextItemStyle: {
    width: 280,
    height: 80,
    margin: 15,
    alignItems: 'flex-start',
  },
  renderItemStyle: {
    flexDirection: 'column',
  },
  renderCourseName: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'left',
    marginBottom: 5,
  },
  renderHoleText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    textAlign: 'left',
    marginBottom: 2,
  },
  renderScore: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'flex-end',
  },
  renderText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  offlineText: {
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    alignSelf: 'center',
    marginRight: 5,
    backgroundColor: 'white',
  },
});
