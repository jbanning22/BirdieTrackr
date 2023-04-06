import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
// import {authentication} from '../firebase/firebase-config';
// import {signOut} from 'firebase/auth';
// import {useDispatch} from 'react-redux';
// import {setSignedIn} from '../redux/signedInSlice';

const Scorecard = ({navigation}) => {
  //   const dispatch = useDispatch();

  //   const signOutUser = () => {
  //     signOut(authentication)
  //       .then(re => {
  //         dispatch(setSignedIn(false));
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };
  return (
    <View style={styles.box1}>
      <Text style={styles.homeText}>Scorecards</Text>
      {/* <Button title="Details" onPress={() => navigation.navigate('Details')} /> */}
      {/* <Button title="Sign out" onPress={signOutUser} /> */}
    </View>
  );
};

export default Scorecard;

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
