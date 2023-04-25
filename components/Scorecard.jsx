import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faExclamation} from '@fortawesome/free-solid-svg-icons/faExclamation';

const Scorecards = ({navigation}) => {
  const [token, setToken] = useState(null);
  const [scorecardData, setScorecardData] = useState([]);

  const handleScorecardPressed = async (id, courseLength) => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scorecard = await axios.get(
        `http://192.168.1.154:3000/scorecard/${id}`,
        {
          headers,
        },
      );
      navigation.navigate('FullScorecard', {
        id: scorecard.data.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({item}) => {
    const date = moment(item.createdAt).format('MMMM Do, YYYY');
    const icon = item.isCompleted ? (
      <FontAwesomeIcon icon={faCheck} color={'green'} size={18} />
    ) : (
      <FontAwesomeIcon icon={faExclamation} color={'red'} size={18} />
    );
    return (
      <View style={styles.flatListParent}>
        <View style={styles.flatlistStyle}>
          <TouchableOpacity
            onPress={() => handleScorecardPressed(item.id, item.courseLength)}>
            <Text style={styles.renderCourseName}>{item.courseName}</Text>
            <Text style={styles.renderHoleText}>{item.courseLength} Holes</Text>
            <Text style={styles.renderText}>{date}</Text>
          </TouchableOpacity>
        </View>
        {icon}
      </View>
    );
  };

  const fetchLoggedInStatus = async () => {
    try {
      const Atoken = await AsyncStorage.getItem('token');
      setToken(Atoken);
    } catch (error) {
      console.error('Error fetching logged-in status:', error);
    }
  };

  const getScorecards = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const scoreC = await axios.get(`http://192.168.1.154:3000/scorecard`, {
        headers,
      });
      //   if (scoreC.data === []) {
      //     setScorecardData(['You have not recorded any rounds yet.']);
      //   } else {
      console.log(scoreC.data);
      setScorecardData(scoreC.data);
      //   }
    } catch (error) {
      console.log('get Scorecard error is: ', error);
    }
  };

  useEffect(() => {
    fetchLoggedInStatus();
  }, []);
  useEffect(() => {
    getScorecards();
  }, []);

  return (
    // <ScrollView>
    <SafeAreaView style={styles.box1}>
      <Text style={styles.homeText}>Scorecards</Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('CreateScorecard')}>
        <Text style={styles.buttonText}>Create Scorecard</Text>
      </TouchableOpacity>
      <FlatList
        renderItem={renderItem}
        data={scorecardData}
        showsVerticalScrollIndicator={false}
        //   contentContainerStyle={styles.flatlistStyle}
      />
    </SafeAreaView>
    // </ScrollView>
  );
};

export default Scorecards;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DB6F52',
  },
  flatListParent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  homeText: {
    fontSize: 40,
    fontWeight: '400',
    fontFamily: 'Helvetica',
    marginBottom: 5,
    color: 'white',
  },
  signUpButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#52BEDB',
    marginTop: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  flatlistStyle: {
    width: 250,
    marginLeft: 15,
  },
  renderItemStyle: {
    flexDirection: 'column',
    margin: 10,
  },
  renderCourseName: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  renderHoleText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '400',
  },
  renderText: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 5,
  },
});
