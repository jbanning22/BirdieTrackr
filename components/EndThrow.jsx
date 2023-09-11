import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import React from 'react';
import Geolocation from 'react-native-geolocation-service';

const EndThrow = props => {
  const {setEnd, calcDistance, startingLocation} = props;

  const getEndingLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // console.log('getEndingLocation ', latitude, longitude);
        if (latitude !== undefined && longitude !== undefined) {
          calcDistance(latitude, longitude);
        }
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={startingLocation !== null ? getEndingLocation : null}
        style={styles.button2}>
        <Text style={styles.buttonText2}>End</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndThrow;

const styles = StyleSheet.create({
  button2: {
    justifyContent: 'center',
    height: 50,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#2D6061',
    marginLeft: 40,
  },
  buttonText2: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'white',
  },
});
