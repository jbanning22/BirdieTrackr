import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ThrowsScreen = ({navigation}) => {
  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>Measure Throw</Text>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => navigation.navigate('CreateScorecard')}>
        <Text>Measure Throw</Text>
      </TouchableOpacity>
      <Text style={{padding: 20}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Sed egestas egestas
        fringilla phasellus faucibus scelerisque eleifend donec pretium. Nulla
        facilisi cras fermentum odio eu feugiat pretium. Diam ut venenatis
        tellus in metus vulputate eu. Dignissim suspendisse in est ante in nibh
        mauris cursus mattis. Sed lectus vestibulum mattis ullamcorper velit
        sed. Faucibus et molestie ac feugiat sed. Nunc eget lorem dolor sed.
        Pretium viverra suspendisse potenti nullam ac tortor. Amet dictum sit
        amet justo. Blandit aliquam etiam erat velit scelerisque in.
      </Text>
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
    fontWeight: '500',
    fontFamily: 'Helvetica',
    marginBottom: 10,
  },
  signUpButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3AE832',
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 8,
  },
});
