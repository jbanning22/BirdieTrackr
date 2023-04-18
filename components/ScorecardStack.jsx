import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateScorecard from './CreateScorecard';
import FullScorecard from './FullScorecard';
import HalfScorecard from './HalfScorecard';
import Scorecards from './Scorecard';

const Stack = createNativeStackNavigator();

const ScorecardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Scorecards"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Scorecards" component={Scorecards} />
      <Stack.Screen name="CreateScorecard1" component={CreateScorecard} />
      <Stack.Screen name="HalfScorecard" component={HalfScorecard} />
      <Stack.Screen name="FullScorecard" component={FullScorecard} />
    </Stack.Navigator>
  );
};

export default ScorecardStack;
