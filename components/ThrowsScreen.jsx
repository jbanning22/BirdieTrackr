import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ThrowsScreen = ({navigation}) => {
  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>Measure Throw</Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('CreateScorecard')}>
        <Text style={styles.buttonText}>Measure Throw</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThrowsScreen;

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
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  signUpButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0C7DEE',
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 8,
  },
});
