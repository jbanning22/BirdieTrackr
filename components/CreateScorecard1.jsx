import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useState} from 'react';

const CreateScorecard1 = ({navigation}) => {
  const [courseLength, setCourseLength] = useState(0);
  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>How Many Holes?</Text>
      <Button title="9 Holes" onPress={() => setCourseLength(9)} />
      <Button title="18 Holes" onPress={() => setCourseLength(18)} />
      <Text>{courseLength}</Text>
      <Button title="back" onPress={() => navigation.navigate('Scorecards')} />
    </View>
  );
};

export default CreateScorecard1;

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
    marginBottom: 80,
  },
});
