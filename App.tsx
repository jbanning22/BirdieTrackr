import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './components/LandingScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScorecardStack from './components/ScorecardStack';
import ProfileStack from './components/ProfileStack';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ThrowsStack from './components/ThrowsStack';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faRuler} from '@fortawesome/free-solid-svg-icons/faRuler';
import {faRectangleList} from '@fortawesome/free-regular-svg-icons/faRectangleList';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Landing">
    <AuthStack.Screen
      name="Landing"
      component={LandingScreen}
      options={{
        title: 'Get Started',
        headerStyle: {
          backgroundColor: '#DB6F52',
        },
        headerTintColor: 'black',
      }}
    />
    <AuthStack.Screen
      name="SignInPage"
      component={SignInScreen}
      options={{
        title: 'Login',
        headerStyle: {
          backgroundColor: '#DB6F52',
        },
        headerTintColor: 'white',
      }}
    />
    <AuthStack.Screen
      name="SignUpPage"
      component={SignUpScreen}
      options={{
        title: 'SignUp',
        headerStyle: {
          backgroundColor: '#DB6F52',
        },
        headerTintColor: 'black',
      }}
    />
  </AuthStack.Navigator>
);
// const Tab = createMaterialBottomTabNavigator();
// const ScorecardStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppStackScreen = () => (
  <Tab.Navigator initialRouteName="Scorecards">
    {/* <Tab.Screen
      name="Courses"
      component={CourseScreen}
      options={{
        title: 'Courses',
        headerStyle: {
          backgroundColor: '#DB6F52',
        },
        headerTintColor: 'white',
      }}
    /> */}
    <Tab.Screen
      name="Scorecards"
      component={ScorecardStack}
      options={{
        title: 'Scorecards',
        tabBarLabelStyle: {color: '#DB6F52'},
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => (
          <FontAwesomeIcon
            icon={faRectangleList}
            color={focused ? '#DB6F52' : 'black'}
            size={20}
          />
        ),
        headerStyle: {backgroundColor: '#DB6F52'},
        headerShown: false,
        headerTintColor: 'white',
      }}
    />
    <Tab.Screen
      name="Throws"
      component={ThrowsStack}
      options={{
        title: 'Throws',
        tabBarLabelStyle: {color: '#DB6F52'},
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => (
          <FontAwesomeIcon
            icon={faRuler}
            color={focused ? '#DB6F52' : 'black'}
            size={20}
          />
        ),
        headerShown: false,
        headerTintColor: 'white',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={{
        title: 'Profile',
        tabBarLabelStyle: {color: '#DB6F52'},
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => (
          <FontAwesomeIcon
            icon={faUser}
            color={focused ? '#DB6F52' : 'black'}
            size={20}
          />
        ),
        headerStyle: {
          backgroundColor: '#DB6F52',
        },
        // headerShown: false,
        headerTintColor: 'white',
      }}
    />
  </Tab.Navigator>
);
const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const authContextValue = {
    signedIn,
    setSignedIn,
  };
  useEffect(() => {
    refreshAccess();
  });
  const queryClient = new QueryClient();

  const refreshAccess = async () => {
    const reToken = await AsyncStorage.getItem('ReToken');
    try {
      const refresh = await axios.post(
        'http://ec2-54-87-189-240.compute-1.amazonaws.com:3000/auth/refresh',
        null,
        {
          headers: {
            Authorization: `Bearer ${reToken}`,
          },
        },
      );
      if (refresh.status === 201) {
        const access_token = await refresh.data.access_token;
        const refresh_token = await refresh.data.refresh_token;

        await AsyncStorage.setItem('token', access_token);
        await AsyncStorage.setItem('ReToken', refresh_token);
        setSignedIn(true);
        return refresh.data;
      } else {
        setSignedIn(false);
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  const RootStack = createNativeStackNavigator();
  return (
    <AuthContext.Provider value={authContextValue}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack.Navigator>
            {signedIn === false ? (
              <RootStack.Screen
                name="Auth"
                component={AuthStackScreen}
                options={{headerShown: false}}
              />
            ) : (
              <RootStack.Screen
                name="App"
                component={AppStackScreen}
                options={{headerShown: false}}
              />
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
// const styles = StyleSheet.create({});
