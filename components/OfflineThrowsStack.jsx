import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateThrow1 from './CreateThrow1';
import Throws1 from './Throws1';
import ThrowsScreen1 from './ThrowsScreen1';

const Stack = createNativeStackNavigator();

const OfflineThrowsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Throws1"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Throws1" component={Throws1} />
      <Stack.Screen name="ThrowsScreen1" component={ThrowsScreen1} />
      <Stack.Screen name="CreateThrow1" component={CreateThrow1} />
    </Stack.Navigator>
  );
};

export default OfflineThrowsStack;
