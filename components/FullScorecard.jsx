import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Animated,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQueryClient} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faAngleLeft,
  faArrowLeft,
  faCirclePlus,
  faCircleMinus,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';

const FullScorecard = ({route, navigation}) => {
  const {id} = route.params;
  const [scorecardData, setScorecardData] = useState({});
  const [holesData, setHolesData] = useState([]);
  // const [showEndButton, setShowEndButton] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;
  const queryClient = useQueryClient();

  const getScorecard = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scoreC = await axios.get(
        `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/scorecard/${id}`,
        {
          headers,
        },
      );
      setScorecardData(scoreC.data);
      setHolesData(scoreC.data.holes);
    } catch (error) {
      throw new Error('Error getting scorecard');
    }
  };

  const updateStrokesPlus = async (id, strokes) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.patch(
        `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/hole/${id}`,
        {strokes: strokes + 1},
        {headers},
      );
      queryClient.refetchQueries('scorecardData');
      getScorecard();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error updating stroke + 1');
    }
  };

  const updateStrokesMinus = async (id, strokes) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.patch(
        `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/hole/${id}`,
        {strokes: strokes - 1},
        {headers},
      );
      queryClient.refetchQueries('scorecardData');
      getScorecard();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error updating stroke - 1');
    }
  };

  const updateParPlus = async (id, par) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.patch(
        `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/hole/${id}`,
        {par: par + 1},
        {headers},
      );
      queryClient.refetchQueries('scorecardData');
      getScorecard();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error updating stroke + 1');
    }
  };
  const updateParMinus = async (id, par) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.patch(
        `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/hole/${id}`,
        {par: par - 1},
        {headers},
      );
      queryClient.refetchQueries('scorecardData');
      getScorecard();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error updating par - 1');
    }
  };

  const finishScorecard = async () => {
    const scorecardId = scorecardData.id;
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      await axios.patch(
        `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/scorecard/${scorecardId}`,
        {isCompleted: true, courseLength: scorecardData.courseLength},
        {headers},
      );
      queryClient.refetchQueries('scorecardData');
      await navigation.navigate('Scorecard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error completing scorecard');
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
        <Text style={styles.renderParentText}>Hole {item.holeNumber}</Text>

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
              onPress={() => updateParMinus(item.id, item.par)}
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
              onPress={() => updateParPlus(item.id, item.par)}
              testID="plus-icon-1">
              {plusIcon}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.parStrokeView}>
          <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
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
              onPress={() => updateStrokesMinus(item.id, item.strokes)}
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
              onPress={() => updateStrokesPlus(item.id, item.strokes)}
              testID="plus-icon-1">
              {plusIcon}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getScorecard();
  }, []);

  useEffect(() => {
    const listener = scrollX.addListener(({value}) => {
      const index = Math.round(value / windowWidth);
      setCurrentIndex(index);
    });
    return () => {
      scrollX.removeListener(listener);
    };
  }, [scrollX]);

  const handlePrev = () => {
    const newIndex = currentIndex - 1;
    if (newIndex >= 0) {
      flatListRef.current.scrollToIndex({index: newIndex, animated: true});
      setCurrentIndex(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex + 1;
    if (newIndex < holesData.length) {
      flatListRef.current.scrollToIndex({index: newIndex, animated: true});
      setCurrentIndex(newIndex);
    }
  };
  // const handleEndReached = () => {
  //   setShowEndButton(true);
  // };

  const sortedData = holesData.sort((a, b) => a.holeNumber - b.holeNumber);
  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Scorecard')}
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
          }}
          testID="back-arrow1">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            style={{marginLeft: 10, backgroundColor: 'white'}}
          />
        </TouchableOpacity>
        {/* <View
          style={{
            alignSelf: 'center',
          }}> */}
        <View style={{flex: 0.25}}></View>
        <Text style={styles.homeText}>{scorecardData.courseName}</Text>
        {/* </View> */}
        <View style={styles.flatlistContainer}>
          <FlatList
            ref={flatListRef}
            renderItem={renderItem}
            data={sortedData}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            // onEndReached={handleEndReached}
            snapToAlignment={'center'}
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
              <FontAwesomeIcon icon={faAngleLeft} size={18} color="white" />
            </TouchableOpacity>
          )}
          {currentIndex === holesData.length - 1 ? (
            <View style={styles.transparentButton} />
          ) : (
            <TouchableOpacity onPress={handleNext} style={styles.navButton}>
              <FontAwesomeIcon icon={faAngleRight} size={18} color="white" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.finishScorecardButton}
          onPress={finishScorecard}
          testID="finish-scorecard-button">
          <Text style={styles.scorecardButtonText}>Finish Scorecard</Text>
        </TouchableOpacity>
        {/* )} */}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FullScorecard;

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
  parButton: {
    // height: 30,
    // width: 30,
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
  navButton: {
    backgroundColor: '#2D6061',
    padding: 8,
    borderRadius: 10,
  },
  transparentButton: {
    padding: 8,
    borderRadius: 10,
    opacity: 0,
    backgroundColor: 'transparent',
  },
});
