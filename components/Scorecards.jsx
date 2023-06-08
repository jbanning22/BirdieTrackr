import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faExclamation} from '@fortawesome/free-solid-svg-icons/faExclamation';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {useQueryClient} from '@tanstack/react-query';
import {useGetScorecards} from './hooks/getScorecardsQuery';
import {useGetUserDetails} from './hooks/getUserDataQuery';
import myImage from '../assets/images/DiscGolfBasket2.png';
import {Dimensions} from 'react-native';

const Scorecards = ({navigation}) => {
  const {
    data: scorecardData,
    // isLoading: isScorecardLoading,
    // isError: isScorecardError,
    // error: Scorecarderror,
  } = useGetScorecards();
  const {
    data: userDetails,
    isLoading: isUserDataLoading,
    // isError: isUserDataError,
    // error: UserDataerror,
  } = useGetUserDetails();
  const queryClient = useQueryClient();
  const windowWidth = Dimensions.get('window').width;
  // const windowHeight = Dimensions.get('window').height;

  const handleScorecardPressed = async id => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scorecard = await axios.get(
        `http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/scorecard/${id}`,
        {
          headers,
        },
      );
      await navigation.navigate('FullScorecard', {
        id: scorecard.data.id,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    const date = moment(item.createdAt).format('MMMM Do, YYYY');
    const icon = item.isCompleted ? (
      <FontAwesomeIcon
        icon={faCheck}
        color={'green'}
        size={12}
        style={{margin: 5}}
      />
    ) : (
      <FontAwesomeIcon
        icon={faExclamation}
        color={'yellow'}
        size={12}
        style={{margin: 5}}
      />
    );
    return (
      <View style={styles.flatListItemParent}>
        <View style={styles.flatlistTextItemsStyle}>
          <TouchableOpacity
            onPress={() => handleScorecardPressed(item.id, item.courseLength)}
            style={{}}>
            <Text style={styles.renderCourseName}>{item.courseName}</Text>
            <Text style={styles.renderHoleText}>{item.courseLength} Holes</Text>
            <Text style={styles.renderText}>{date}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          {icon}
          <TouchableOpacity onPress={() => deleteScorecard(item.id)}>
            <FontAwesomeIcon
              icon={faTrashCan}
              color={'white'}
              size={12}
              style={{margin: 5}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const deleteScorecard = async id => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    Alert.alert(
      'Delete Throw',
      'Are you sure you want to delete this scorecard?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await axios.delete(
                `http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/scorecard/${id}`,
                {headers},
              );
              queryClient.invalidateQueries('scorecardData');
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <View style={{padding: 10}}>
          <Text
            style={{
              fontFamily: 'Satoshi-Medium',
              fontSize: 20,
              marginTop: 10,
            }}>
            Hi,{' '}
            {isUserDataLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              userDetails.firstName
            )}
          </Text>
          <Text style={{flexDirection: 'column', color: 'grey'}}>
            Welcome back to{' '}
            <Text
              style={{
                color: '#45B369',
                fontSize: 14,
                fontFamily: 'Satoshi-Medium',
              }}>
              DG Scorecard
            </Text>
            !
          </Text>
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
          {scorecardData && scorecardData.length === 0 ? (
            <Text>You have not recorded any rounds yet.</Text>
          ) : (
            <FlatList
              renderItem={renderItem}
              data={scorecardData}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <View
          style={{
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.createScorecardButton}
            onPress={() => navigation.navigate('CreateScorecard')}>
            <Text style={styles.buttonText}>Create Scorecard</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Scorecards;

const styles = StyleSheet.create({
  imageBackground: {
    // flex: 1,
    resizeMode: 'cover',
    // opacity: 0.5,
  },
  box1: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatListItemParent: {
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
    fontSize: 16,
    fontWeight: '500',
  },
  flatlistTextItemsStyle: {
    width: 280,
    height: 60,
    margin: 10,
    alignItems: 'flex-start',
  },
  renderItemStyle: {
    flexDirection: 'column',
  },
  renderCourseName: {
    fontFamily: 'Satoshi-Medium',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  renderHoleText: {
    fontFamily: 'Satoshi-Medium',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  renderText: {
    fontFamily: 'Satoshi-Medium',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    color: 'white',
  },
});
