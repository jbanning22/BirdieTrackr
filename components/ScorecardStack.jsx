import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateScorecard from './CreateScorecard';
import FullScorecard from './FullScorecard';
import Scorecards from './Scorecard';

const Stack = createNativeStackNavigator();

const ScorecardStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Scorecard"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Scorecard" component={Scorecards} />
      <Stack.Screen name="CreateScorecard" component={CreateScorecard} />
      <Stack.Screen name="FullScorecard" component={FullScorecard} />
    </Stack.Navigator>
  );
};

export default ScorecardStack;
