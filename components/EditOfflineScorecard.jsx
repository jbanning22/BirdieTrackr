import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCirclePlus,
  faCircleMinus,
  faAngleRight,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';
import {Alert} from 'react-native';

const EditOfflineScorecard = ({route, navigation}) => {
  const {scoreCard, courseName, previousRouteName, scorecardID} = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [scorecardData, setScorecardData] = useState(
    scoreCard.sort((a, b) => a.holeNumber - b.holeNumber),
  );
  const [showEndButton, setShowEndButton] = useState(false);
  const windowWidth = Dimensions.get('window').width;

  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!scorecardData) {
      setScorecardData(scoreCard.sort((a, b) => a.holeNumber - b.holeNumber));
    }
  }, [scorecardData]);

  const confirmExit = () => {
    Alert.alert(
      'Confirm Exit',
      'Are you sure you want to exit without saving your progress?',
      [
        {
          text: 'No',
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => navigation.navigate('Scorecards1')},
      ],
      {cancelable: false},
    );
  };

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
        // console.log('Scorecard added to userData.');
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
            id: existingScorecardId,
            courseName: courseName,
            isCompleted: true,
            scorecardData,
          };
          userData.scorecards[index] = updatedScorecard;
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          navigation.navigate('Scorecards1', {reset: true});
          // console.log('Scorecard updated successfully.');
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
  const handlePrev = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      flatListRef.current.scrollToIndex({index: newIndex, animated: true});
      setCurrentIndex(newIndex); // Update the current index
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < scorecardData.length) {
      flatListRef.current.scrollToIndex({index: newIndex, animated: true});
      setCurrentIndex(newIndex); // Update the current index
    }
  };
  useEffect(() => {
    const listener = scrollX.addListener(({value}) => {
      const index = Math.round(value / windowWidth); // Assuming windowWidth is the width of your items
      setCurrentIndex(index);
    });
    return () => {
      scrollX.removeListener(listener);
    };
  }, [scrollX]);

  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <TouchableOpacity
          onPress={confirmExit}
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
            ref={flatListRef}
            renderItem={renderItem}
            data={scorecardData}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            // onEndReached={handleEndReached}
            snapToAlignment={'center'}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            viewabilityConfig={{itemVisiblePercentThreshold: 50}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 55,
            marginVertical: 5,
          }}>
          {currentIndex === 0 ? (
            <View style={styles.transparentButton} />
          ) : (
            <TouchableOpacity onPress={handlePrev} style={styles.navButton}>
              {/* <Text style={styles.navButtonText}>Prev</Text> */}
              <FontAwesomeIcon icon={faAngleLeft} size={18} color="white" />
            </TouchableOpacity>
          )}
          {currentIndex === scorecardData.length - 1 ? (
            <View style={styles.transparentButton} />
          ) : (
            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
              {/* <Text style={styles.navButtonText}>Next</Text> */}
              <FontAwesomeIcon icon={faAngleRight} size={18} color="white" />
            </TouchableOpacity>
          )}
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
    marginTop: 20,
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
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 5,
  },
  navButton: {
    backgroundColor: '#2D6061',
    padding: 8,
    borderRadius: 10,
  },
  disabledButton: {
    opacity: 0,
  },
  navButtonText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
    color: 'white',
    fontWeight: '700',
  },
  transparentButton: {
    padding: 8,
    borderRadius: 10,
    opacity: 0,
    backgroundColor: 'transparent',
  },
});
