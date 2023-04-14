// import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import jwtDecode from 'jwt-decode';
import LandingScreen from './components/LandingScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScorecardStack from './components/ScorecardStack';
import ProfileScreen from './components/ProfileScreen';
import CourseScreen from './components/CourseScreen';
import ThrowsScreen from './components/ThrowsScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Landing">
    <AuthStack.Screen
      name="Landing"
      component={LandingScreen}
      options={{
        title: 'Get Started',
        headerStyle: {
          backgroundColor: '#E58315',
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
          backgroundColor: '#E58315',
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
          backgroundColor: '#E58315',
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
  <Tab.Navigator initialRouteName="Scorecard">
    <Tab.Screen
      name="Courses"
      component={CourseScreen}
      options={{
        title: 'Courses',
        headerStyle: {
          backgroundColor: '#E58315',
        },
        headerTintColor: 'white',
      }}
    />
    <Tab.Screen
      name="Scorecard"
      component={ScorecardStack}
      options={{
        title: 'Scorecards',
        headerStyle: {backgroundColor: '#E58315'},
        headerTintColor: 'white',
      }}
    />
    <Tab.Screen
      name="Throws"
      component={ThrowsScreen}
      options={{
        title: 'Throws',
        headerStyle: {backgroundColor: '#E58315'},
        headerTintColor: 'white',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
        headerStyle: {
          backgroundColor: '#E58315',
        },
        headerTintColor: 'white',
      }}
    />
  </Tab.Navigator>
);
const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  const decodeToken = async () => {
    try {
      const currentDate = new Date();
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      console.log('expiration timeDate is: ', expirationDate);
      console.log('current timeDate is: ', currentDate);
      if (currentDate > expirationDate) {
        setSignedIn(false);
      } else if (expirationDate > currentDate) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }
    } catch (error) {
      console.log('decode token error is: ', error);
    }
  };
  //   const fetchLoggedInStatus = async () => {
  //     try {
  //       const status = await AsyncStorage.getItem('signedIn_status');
  //       if (status === 'allGood') {
  //         setSignedIn(true);
  //       } else if (status === 'noGood') {
  //         setSignedIn(false);
  //       } else {
  //         setSignedIn(false);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching logged-in status:', error);
  //     }
  //   };
  //   useEffect(() => {
  //     fetchLoggedInStatus();
  //   });
  useEffect(() => {
    decodeToken();
  });

  const RootStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="App"
          component={AppStackScreen}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
      {/* {signedIn === false ? <AuthStackScreen /> : <AppStackScreen />} */}
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
