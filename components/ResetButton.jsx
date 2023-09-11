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
