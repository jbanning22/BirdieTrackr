import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';

const DetailsScreen = ({navigation}) => {
  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>Details</Text>
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
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default DetailsScreen;

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
    marginBottom: 80,
  },
});
