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

const FullScorecard = ({route, navigation}) => {
  const {id} = route.params;
  const [scorecardData, setScorecardData] = useState({});
  const [holesData, setHolesData] = useState([]);
  const [holeId, setHoleId] = useState();

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
      console.log('get scorecard is: ', scoreC.data.holes[1].id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStrokesPlus = async (id, strokes) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const updatedHoleP = await axios.patch(
        `http://localhost:3000/hole/${id}`,
        {strokes: strokes + 1},
        {headers},
      );
      //   console.log('updatedStrokes plus called', updatedHoleP);
      getScorecard();
      // setData([...updatedHoleP.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStrokesMinus = async (id, strokes) => {
    console.log('id in update stroke minus is:', id);
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const updatedHoleM = await axios.patch(
        `http://localhost:3000/hole/${id}`,
        {strokes: strokes - 1},
        {headers},
      );
      //   setData(updatedHoleM.data);
      //   console.log(updatedHoleM.data);
      getScorecard();
    } catch (error) {
      console.log(error);
    }
  };

  const updateParPlus = async (id, par) => {
    console.log('par in update par plus is: ', par);
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const updatedHolePar = await axios.patch(
        `http://localhost:3000/hole/${id}`,
        {par: par + 1},
        {headers},
      );
      getScorecard();
    } catch (error) {
      console.log(error);
    }
  };
  const updateParMinus = async (id, par) => {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const updatedHoleParM = await axios.patch(
        `http://localhost:3000/hole/${id}`,
        {par: par - 1},
        {headers},
      );
      getScorecard();
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
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => updateParPlus(item.id, item.par)}>
              <Text style={styles.buttonTextPlus}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => updateParMinus(item.id, item.par)}>
              <Text style={styles.buttonTextMinus}>-</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.parStrokeView}>
          <Text style={styles.renderText}>Strokes: {item.strokes}</Text>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => updateStrokesPlus(item.id, item.strokes)}>
              <Text style={styles.buttonTextPlus}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.parButton}
              activeOpacity={0.5}
              onPress={() => updateStrokesMinus(item.id, item.strokes)}>
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
  const sortedData = holesData.sort((a, b) => a.holeNumber - b.holeNumber);
  return (
    <SafeAreaView style={styles.box1}>
      <Text style={styles.homeText}>{scorecardData.courseName} Scorecard</Text>
      <View style={styles.flatlistContainer}>
        <FlatList
          renderItem={renderItem}
          data={sortedData}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('Scorecards')}>
        <Text style={{alignSelf: 'center', marginTop: 50}}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FullScorecard;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    fontWeight: '600',
    color: '#13E12B',
  },
  buttonTextMinus: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '600',
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
    // marginTop: 40,
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
