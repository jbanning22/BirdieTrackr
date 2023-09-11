import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import EditUserScreen from './EditUserScreen';
import {faArrowLeft, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileLanding"
      screenOptions={({navigation, route}) => {
        return {
          title: 'Profile',
          headerStyle: {
            // backgroundColor: '#2D6061',
            backgroundColor: 'white',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'black',
          },
          headerRight: () => {
            return route.name !== 'EditProfile' ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('EditProfile')}
                style={{marginRight: 15}}>
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  color="#2D6061"
                  size={20}
                  testID={'pencil-icon'}
                />
              </TouchableOpacity>
            ) : null;
          },
          headerLeft: () => {
            if (route.name !== 'ProfileLanding') {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileLanding')}
                  style={{marginLeft: 15}}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    color="#2D6061"
                    size={20}
                    testID={'leftArrow-icon'}
                  />
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          },
        };
      }}>
      <Stack.Screen name="ProfileLanding" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditUserScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
