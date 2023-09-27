import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateScorecard1 from './CreateScorecard1';
import FullScorecard1 from './FullScorecard1';
import Scorecard1 from './Scorecards1';

const Stack = createNativeStackNavigator();

const OfflineScorecardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Scorecards1"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Scorecards1" component={Scorecard1} />
      <Stack.Screen name="CreateScorecard1" component={CreateScorecard1} />
      <Stack.Screen name="FullScorecard1" component={FullScorecard1} />
    </Stack.Navigator>
  );
};

export default OfflineScorecardStack;
