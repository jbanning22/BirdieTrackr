import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ResetButton = props => {
  const {resetValues} = props;

  return (
    <View>
      <TouchableOpacity onPress={resetValues} style={styles.resetStyle}>
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetButton;

const styles = StyleSheet.create({
  resetStyle: {
    height: 25,
    width: 50,
    borderRadius: 5,
    backgroundColor: '#E24D4D',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 7,
  },
  resetText: {
    fontSize: 14,
    color: 'white',
  },
});
