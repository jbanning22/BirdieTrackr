import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQueryClient} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faCirclePlus,
  faCircleMinus,
} from '@fortawesome/free-solid-svg-icons';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';

const FullScorecard = ({route, navigation}) => {
  const {id} = route.params;
  const [scorecardData, setScorecardData] = useState({});
  const [holesData, setHolesData] = useState([]);
  const [showEndButton, setShowEndButton] = useState(false);
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
      queryClient.invalidateQueries('scorecardData');
      await navigation.navigate('Scorecard');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error completing scorecard');
    }
  };
  const plusIcon = (
    <FontAwesomeIcon icon={faCirclePlus} color={'#4CAF50'} size={24} />
  );
  const minusIcon = (
    <FontAwesomeIcon icon={faCircleMinus} color={'#F15436'} size={24} />
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
              onPress={() => updateParPlus(item.id, item.par)}
              testID="plus-icon-1">
              <Text>{plusIcon}</Text>
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
              onPress={() => updateParMinus(item.id, item.par)}
              testID="minus-icon-1">
              <Text>{minusIcon}</Text>
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
              onPress={() => updateStrokesPlus(item.id, item.strokes)}
              testID="plus-icon-1">
              <Text>{plusIcon}</Text>
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
              onPress={() => updateStrokesMinus(item.id, item.strokes)}
              testID="minus-icon-1">
              <Text>{minusIcon}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getScorecard();
  }, []);

  const handleEndReached = () => {
    setShowEndButton(true);
  };

  const sortedData = holesData.sort((a, b) => a.holeNumber - b.holeNumber);
  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            justifyContent: 'space-evenly',
            padding: 4,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Scorecard')}
            style={{flex: 1}}
            testID="back-arrow1">
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={20}
              style={{marginLeft: 15, marginTop: 18}}
            />
          </TouchableOpacity>
          <Text style={styles.homeText}>{scorecardData.courseName}</Text>
          <View style={{flex: 1}}></View>
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            renderItem={renderItem}
            data={sortedData}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}
            onEndReached={handleEndReached}
            snapToAlignment={'center'}
          />
        </View>
        {showEndButton && (
          <TouchableOpacity
            style={styles.finishScorecardButton}
            onPress={finishScorecard}
            testID="finish-scorecard-button">
            <Text style={styles.scorecardButtonText}>Finish Scorecard</Text>
          </TouchableOpacity>
        )}
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
    resizeMode: 'cover',
    justifyContent: 'space-evenly',
  },
  homeText: {
    fontSize: 28,
    fontWeight: '600',
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
    margin: 10,
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
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
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
    margin: 15,
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
});
