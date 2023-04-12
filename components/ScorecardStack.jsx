import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateScorecard1 from './CreateScorecard1';
import Scorecards from './Scorecard';

const Stack = createNativeStackNavigator();

const ScorecardStack = () => {
  return (
    <Stack.Navigator initialRouteName="Scorecards">
      <Stack.Screen name="Scorecards" component={Scorecards} />
      <Stack.Screen name="CreateScorecard1" component={CreateScorecard1} />
    </Stack.Navigator>
  );
};

export default ScorecardStack;
