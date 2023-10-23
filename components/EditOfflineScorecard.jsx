import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCirclePlus,
  faCircleMinus,
} from '@fortawesome/free-solid-svg-icons';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';

const EditOfflineScorecard = ({route, navigation}) => {
  const {scoreCard, courseName, previousRouteName, scorecardID} = route.params;

  const [scorecardData, setScorecardData] = useState(
    scoreCard.sort((a, b) => a.holeNumber - b.holeNumber),
  );
  const [showEndButton, setShowEndButton] = useState(false);
  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!scorecardData) {
      setScorecardData(scoreCard.sort((a, b) => a.holeNumber - b.holeNumber));
    }
  }, [scorecardData]);

  const retrieveUserData = async () => {
    try {
      const jsonUserData = await AsyncStorage.getItem('userData');
      return jsonUserData != null ? JSON.parse(jsonUserData) : null;
    } catch (error) {
      console.error('Error retrieving userData from AsyncStorage:', error);
      return null;
    }
  };
  let scorecardId = 0;

  const saveNewScorecard = async () => {
    try {
      const userData = await retrieveUserData();
      if (userData !== null) {
        scorecardId = Math.max(...userData.scorecards.map(sc => sc.id), 0) + 1;
        const scorecardWithId = {
          id: scorecardId,
          courseName: courseName,
          isCompleted: true,
          scorecardData,
        };
        userData.scorecards.push(scorecardWithId);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        navigation.navigate('Scorecards1', {reset: true});
        console.log('Scorecard added to userData.');
      } else {
        console.log('userData not found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error adding scorecard:', error);
    }
  };

  const updateScorecard = async () => {
    try {
      const userData = await retrieveUserData();
      if (userData !== null) {
        const existingScorecardId = scorecardID;
        const index = userData.scorecards.findIndex(
          sc => sc.id === existingScorecardId,
        );
        if (index !== -1) {
          const updatedScorecard = {
            id: existingScorecardId, // keep the same id
            courseName: courseName,
            isCompleted: true,
            scorecardData,
          };
          userData.scorecards[index] = updatedScorecard;
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          navigation.navigate('Scorecards1', {reset: true});
          console.log('Scorecard updated successfully.');
        } else {
          console.error('Scorecard not found.');
        }
      } else {
        console.error('userData not found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Error updating scorecard:', error);
    }
  };
  const saveScorecard = async () => {
    if (previousRouteName === 'CreateScorecard1') {
      saveNewScorecard();
    } else {
      updateScorecard();
    }
  };

  const plusIcon = (
    <FontAwesomeIcon
      icon={faCirclePlus}
      color={'#4CAF50'}
      size={24}
      style={{marginBottom: 2}}
    />
  );
  const minusIcon = (
    <FontAwesomeIcon
      icon={faCircleMinus}
      color={'#F15436'}
      size={24}
      style={{marginBottom: 2}}
    />
  );
  const ITEM_WIDTH = windowWidth * 0.9;

  const renderItem = ({item}) => {
    return (
      <View style={[styles.flatlistView, {width: ITEM_WIDTH}]}>
        <Text style={styles.renderParentText}>Hole {item?.holeNumber}</Text>
        <View style={styles.parStrokeView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.renderText}>Par</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => {
                setScorecardData(
                  scorecardData.map(cardItem => {
                    if (cardItem.holeNumber === item.holeNumber) {
                      return {...cardItem, par: cardItem.par - 1};
                    }
                    // editScorecard();
                    return cardItem;
                  }),
                );
              }}
              testID="minus-icon-1">
              {minusIcon}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                alignSelf: 'center',
                marginLeft: 10,
                marginRight: 10,
              }}>
              {item.par}
            </Text>
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => {
                setScorecardData(
                  scorecardData.map(cardItem => {
                    if (cardItem.holeNumber === item.holeNumber) {
                      return {...cardItem, par: cardItem.par + 1};
                    }
                    return cardItem;
                  }),
                );
              }}
              testID="plus-icon-1">
              {plusIcon}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.parStrokeView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.renderText}>Strokes</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => {
                setScorecardData(
                  scorecardData.map(cardItem => {
                    if (cardItem.holeNumber === item.holeNumber) {
                      return {...cardItem, strokes: cardItem.strokes - 1};
                    }
                    return cardItem;
                  }),
                );
              }}
              testID="minus-icon-1">
              {minusIcon}
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                alignSelf: 'center',
                marginLeft: 10,
                marginRight: 10,
              }}>
              {item.strokes}
            </Text>
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => {
                setScorecardData(
                  scorecardData.map(cardItem => {
                    if (cardItem.holeNumber === item.holeNumber) {
                      return {...cardItem, strokes: cardItem.strokes + 1};
                    }
                    return cardItem;
                  }),
                );
              }}
              testID="plus-icon-1">
              {plusIcon}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // const handleEndReached = () => {
  //   setShowEndButton(true);
  // };

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Scorecards1')}
          style={{position: 'absolute', top: 10, left: 10}}
          testID="back-arrow1">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            style={{marginLeft: 10, backgroundColor: 'white'}}
          />
        </TouchableOpacity>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}> */}
        <Text style={styles.homeText}>{courseName}</Text>
        {/* </View> */}
        <View style={styles.flatlistContainer}>
          <FlatList
            renderItem={renderItem}
            data={scorecardData}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            // onEndReached={handleEndReached}
            snapToAlignment={'center'}
          />
        </View>
        {/* {showEndButton && ( */}
        <TouchableOpacity
          style={styles.finishScorecardButton}
          onPress={saveScorecard}
          testID="finish-scorecard-button">
          <Text style={styles.scorecardButtonText}>Finish Scorecard</Text>
        </TouchableOpacity>
        {/* )} */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EditOfflineScorecard;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageBackground: {
    flex: 1,
    // resizeMode: 'cover',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'white',
  },
  finishScorecardButton: {
    width: 327,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 14,
  },
  scorecardButtonText: {
    color: 'white',
    fontWeight: '500',
    fontFamily: 'Satoshi-Medium',
    alignSelf: 'center',
    fontSize: 18,
  },
  parStrokeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    paddingHorizontal: 30,
  },
  flatlistContainer: {
    flex: 0,
    width: '100%',
  },
  renderParentText: {
    alignSelf: 'center',
    fontFamily: 'Satoshi-Medium',
    fontSize: 20,
    fontWeight: '600',
    // eslint-disable-next-line no-dupe-keys
    fontSize: 20,
  },
  renderText: {
    alignSelf: 'center',
    fontFamily: 'Satoshi-Medium',
    fontSize: 16,
    fontWeight: '700',
    // eslint-disable-next-line no-dupe-keys
    fontSize: 22,
    paddingVertical: 15,
  },
  flatlistView: {
    height: 300,
    justifyContent: 'space-evenly',
    // alignItems: '',
    margin: 20,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
