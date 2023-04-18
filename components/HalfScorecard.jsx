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
        <Text style={styles.renderText}>Par: {item.par}</Text>
        <Text style={styles.renderText}>Strokes: {item.strokes}</Text>
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
    </SafeAreaView>
  );
};

export default HalfScorecard;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    textAlign: 'center',
  },
  flatlistContainer: {
    flex: 0,
    width: '100%',
    marginTop: 40,
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
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginTop: 20,
  },
});
