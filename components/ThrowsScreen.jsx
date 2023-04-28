import {StyleSheet, Text, View, Dimensions, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import StartThrow from './StartThrow';
import EndThrow from './EndThrow';
import ResetButton from './ResetButton';
import {Platform} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ThrowsScreen = ({navigation}) => {
  const [startingLocation, setStartLocation] = useState(null);
  const [endingLocation, setEndLocation] = useState(null);
  const [endingDist, setEndingDist] = useState(null);
  const [presentLocation, setPresentLocation] = useState(null);

  useEffect(() => {
    // console.log('height is: ', windowHeight, 'width is: ', windowWidth);
    if (presentLocation === null) {
      getPresentLocation();
    }
  }, [presentLocation]);

  const getPresentLocation = () => {
    return Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log(
          'getCurrentPosition latitude is: ',
          latitude,
          'longitude is: ',
          longitude,
        );
        setPresentLocation({latitude, longitude});
      },
      error => {
        console.log(
          'error.code: ',
          error.code,
          'error.message: ',
          error.message,
        );
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  function distance(lat2, lon2) {
    setEndLocation({lat2, lon2});
    console.log('startingLocation in distance method is', startingLocation);
    console.log('endingLocation in distance method is', endingLocation);
    const lat1 = startingLocation.latitude;
    const lon1 = startingLocation.longitude;
    if (lat1 === lat2 && lon1 === lon2) {
      setEndingDist(0);
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = Math.round(dist * 5280);
      setEndingDist(dist);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  function reset() {
    setStartLocation(null);
    setEndLocation(null);
    setEndingDist(null);
  }
  return (
    <SafeAreaView style={styles.box1}>
      <View>
        <Text style={styles.titleStyle}>Disc Distance</Text>
        {endingDist !== null ? (
          <Text style={styles.distanceText}>{`${endingDist}ft`}</Text>
        ) : (
          <Text style={styles.distanceText2}>Measure Your Throw!</Text>
        )}
      </View>

      {presentLocation !== null && (
        <MapView
          mapType="satellite"
          showsUserLocation={true}
          style={styles.mapSizing}
          initialRegion={{
            latitude: presentLocation.latitude,
            longitude: presentLocation.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}>
          {startingLocation !== null && (
            <Marker
              coordinate={{
                latitude: startingLocation.latitude,
                longitude: startingLocation.longitude,
              }}
            />
          )}
          {endingLocation !== null && (
            <Marker
              coordinate={{
                latitude: endingLocation.latitude,
                longitude: endingLocation.longitude,
              }}
            />
          )}
        </MapView>
      )}

      <View style={styles.buttonContainer}>
        <StartThrow setStart={setStartLocation} />
        <ResetButton resetValues={reset} />
        <EndThrow
          calcDistance={distance}
          setEnd={setEndLocation}
          startingLocation={startingLocation}
        />
      </View>

      <View style={styles.lastView}>
        <Text style={styles.textStyle1}>
          All distances are accurate within 20ft.
        </Text>
      </View>
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
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    //alignSelf: 'center',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '500',
    color: 'blue',
    marginTop: 12,
  },
  buttonStyle: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
  },
  distanceText2: {
    fontSize: 24,
    alignSelf: 'center',
    fontWeight: '500',
    color: 'blue',
    marginTop: 12,
  },
  textStyle1: {
    fontSize: 10,
    color: 'white',
  },
  lastView: {
    justifyContent: 'flex-end',
    marginTop: 15,
  },
  mapSizing: {
    margin: 15,
    height: '80%',
    width: '95%',
  },
  mapStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Helvetica',
    alignSelf: 'center',
  },
  titleView: {
    flex: 2,
    justifyContent: 'flex-start',
  },
});
