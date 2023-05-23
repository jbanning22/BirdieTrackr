import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {Alert} from 'react-native';

const ThrowsScreen = ({navigation}) => {
  const [throwData, setThrowData] = useState([]);

  const getThrows = async () => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const measuredThrows = await axios.get(
        'http://localhost:3000/measure-throws',
        {headers},
      );
      setThrowData(measuredThrows.data);
    } catch (error) {
      //   console.log(error);
      console.log('error getting throw details');
    }
  };

  const deleteThrow = async id => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    Alert.alert(
      'Delete Throw',
      'Are you sure you want to delete this throw?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const deleteThrow = await axios.delete(
                `http://localhost:3000/measure-throws/${id}`,
                {headers},
              );
              getThrows();
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderItem = ({item}) => {
    const date = moment(item.createdAt).format('MMMM Do, YYYY');
    return (
      <View style={styles.flatListParent}>
        <View style={styles.flatlistStyle}>
          <Text style={styles.renderCourseName}>{item.distance} ft</Text>
          <Text style={styles.renderHoleText}>{item.disc}</Text>
          <Text style={styles.throwTypeText}>{item.throwtype}</Text>
          <Text style={styles.renderText}>{date}</Text>
        </View>
        <TouchableOpacity onPress={() => deleteThrow(item.id)}>
          <FontAwesomeIcon
            icon={faTrashCan}
            color={'white'}
            size={12}
            style={{margin: 4}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  useEffect(() => {
    getThrows();
  }, []);
  //   useEffect(() => {
  //     getThrows();
  //   }, []);
  //   const sortedThrows = throwData.sort((a, b) => b.distance - a.distance);
  return (
    <SafeAreaView style={styles.box1}>
      <Text style={styles.titleText}>Throws</Text>
      {throwData.length === 0 ? (
        <Text>You have not recorded any throws yet.</Text>
      ) : (
        <FlatList
          renderItem={renderItem}
          data={throwData}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity
        style={styles.measureThrowButton}
        onPress={() => navigation.navigate('ThrowsScreen2')}>
        <Text style={styles.buttonText}>Measure a Throw</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ThrowsScreen;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DB6F52',
  },
  titleText: {
    fontSize: 36,
    alignSelf: 'center',
    fontWeight: '500',
    color: 'white',
    marginBottom: 20,
  },
  flatListParent: {
    flexDirection: 'row',
    backgroundColor: '#52BEDB',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  measureThrowButton: {
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
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
  },
  renderHoleText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  throwTypeText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
  renderText: {
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 5,
    color: 'white',
  },
});
