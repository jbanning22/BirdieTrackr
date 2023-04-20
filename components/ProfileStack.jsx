import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import EditUserScreen from './EditUserScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileLanding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileLanding" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditUserScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
