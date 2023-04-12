import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CreateScorecard1 from '../components/CreateScorecard1';

const Scorecards = ({navigation}) => {
  const [token, setToken] = useState(null);
  const [scorecardData, setScorecardData] = useState([]);

  const getScorecards = async () => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scoreC = await axios.get(`http://localhost:3000/scorecard`, {
        headers,
      });
      console.log(scoreC.data);
      setScorecardData(scoreC.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    console.log('render item is: ', item);
    return (
      <View style={styles.renderItemStyle}>
        <Text style={{alignSelf: 'center', fontSize: 20, fontWeight: '200'}}>
          {item}
        </Text>
      </View>
    );
  };

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      try {
        const Atoken = await AsyncStorage.getItem('token');
        console.log('token is', token);
        setToken(Atoken);
      } catch (error) {
        console.error('Error fetching logged-in status:', error);
      }
    };

    fetchLoggedInStatus();
  }, []);

  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>Scorecards</Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('CreateScorecard1')}>
        <Text>Create Scorecard</Text>
      </TouchableOpacity>
      <FlatList
        renderItem={renderItem}
        data={scorecardData}
        contentContainerStyle={styles.flatlistStyle}
      />
    </View>
  );
};

export default Scorecards;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 20,
  },
  signUpButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E58315',
    marginTop: 10,
    borderRadius: 8,
  },
  flatlistStyle: {
    width: 300,
    borderWidth: 2,
    borderColor: 'white',
    padding: 10,
  },
});
