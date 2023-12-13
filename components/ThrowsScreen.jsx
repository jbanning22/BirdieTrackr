import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons/faTrashCan';
import {Alert} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {useGetThrowDetails} from './hooks/getThrowDataQuery';
import myImage from '../assets/images/BasketBackground2.png';
import {Dimensions} from 'react-native';
import LargeButton from './button/LargeButton';

const ThrowsScreen = ({navigation}) => {
  // const [throwData, setThrowData] = useState([]);
  const {data: throwData, isLoading, isError, error} = useGetThrowDetails();
  const windowWidth = Dimensions.get('window').width;

  const queryClient = useQueryClient();

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
            // eslint-disable-next-line no-useless-catch
            try {
              await axios.delete(
                `http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/measure-throws/${id}`,
                {headers},
              );
              queryClient.invalidateQueries('throwData');
            } catch (error) {
              throw error;
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
            size={16}
            style={{margin: 8}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  // useEffect(() => {
  //   getThrows();
  // }, []);

  //   const sortedThrows = throwData.sort((a, b) => b.distance - a.distance);
  return (
    <SafeAreaView style={styles.box1}>
      <ImageBackground source={myImage} style={styles.imageBackground}>
        <Text style={styles.titleText}>Throws</Text>
        <View
          style={{
            padding: 20,
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            height: 570,
            width: windowWidth,
          }}>
          {throwData && throwData.length ? (
            <FlatList
              renderItem={renderItem}
              data={throwData}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={{fontSize: 18, fontWeight: '500'}}>
              You have not recorded any throws yet.
            </Text>
          )}
        </View>
        <LargeButton
          buttonText="Measure a Throw"
          onPress={() => navigation.navigate('ThrowsScreen2')}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ThrowsScreen;

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  box1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 36,
    alignSelf: 'center',
    fontWeight: '500',
    color: 'black',
    fontFamily: 'Satoshi-Medium',
    backgroundColor: 'white',
  },
  flatListParent: {
    flexDirection: 'row',
    backgroundColor: '#2D6061',
    justifyContent: 'center',
    alignContent: 'flex-start',
    borderRadius: 8,
    marginBottom: 10,
  },
  measureThrowButton: {
    width: 327,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#2D6061',
    borderRadius: 14,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'Satoshi-Medium',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  flatlistStyle: {
    width: 280,
    margin: 10,
  },
  renderItemStyle: {
    flexDirection: 'column',
  },
  renderCourseName: {
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Satoshi-Medium',
    marginLeft: 25,
  },
  renderHoleText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Satoshi-Medium',
  },
  throwTypeText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'Satoshi-Medium',
  },
  renderText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: 'white',
    fontFamily: 'Satoshi-Medium',
  },
});
