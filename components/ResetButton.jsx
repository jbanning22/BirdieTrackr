import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ResetButton = props => {
  const {resetValues} = props;

  return (
    <View
      style={{
        backgroundColor: '#F9FAFB',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <TouchableOpacity onPress={resetValues} style={styles.resetStyle}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetButton;

const styles = StyleSheet.create({
  resetStyle: {
    height: 40,
    width: 80,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 7,
  },
  resetText: {
    fontSize: 24,
    alignSelf: 'center',
    color: 'black',
  },
});
