import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {Dimensions} from 'react-native';

const HalfScorecard = ({route, navigation}) => {
  const {id} = route.params;
  const [scorecardData, setScorecardData] = useState({});
  const [holesData, setHolesData] = useState([]);

  const getScorecard = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scoreC = await axios.get(`http://localhost:3000/scorecard/${id}`, {
        headers,
      });
      setScorecardData(scoreC.data);
      setHolesData(scoreC.data.holes);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.flatlistView}>
        <Text style={styles.renderParentText}>Hole {item.holeNumber}</Text>
        <View style={styles.parStrokeView}>
          <Text style={styles.renderText}>Par: {item.par}</Text>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity style={styles.parButton} activeOpacity={0.5}>
              <Text style={styles.buttonTextPlus}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parButton} activeOpacity={0.5}>
              <Text style={styles.buttonTextMinus}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.parStrokeView}>
          <Text style={styles.renderText}>Strokes: {item.strokes}</Text>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity style={styles.parButton} activeOpacity={0.5}>
              <Text style={styles.buttonTextPlus}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parButton} activeOpacity={0.5}>
              <Text style={styles.buttonTextMinus}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    getScorecard();
  }, []);
  return (
    <SafeAreaView style={styles.box1}>
      <Text style={styles.homeText}>{scorecardData.courseName} Scorecard</Text>
      <View style={styles.flatlistContainer}>
        <FlatList
          renderItem={renderItem}
          data={holesData}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Scorecards')}>
        <Text style={{alignSelf: 'center'}}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HalfScorecard;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
  },
  homeText: {
    fontSize: 44,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    color: '#DB6F52',
  },
  parButton: {
    height: 25,
    width: 25,
  },
  buttonTextPlus: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '400',
    color: '#13E12B',
  },
  buttonTextMinus: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '400',
    color: '#EA5C09',
  },
  parStrokeView: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  flatlistContainer: {
    flex: 0,
    width: '100%',
    // marginTop: 10,
  },
  renderParentText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    fontSize: 22,
    margin: 25,
  },
  renderText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '300',
    fontSize: 22,
    margin: 15,
  },
  flatlistView: {
    height: 400,
    width: 395,
    alignContent: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: 'black',
    padding: 10,
    marginTop: 20,
  },
});
