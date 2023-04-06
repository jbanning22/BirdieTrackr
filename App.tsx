// import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './components/LandingScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Scorecard from './components/Scorecard';
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

// const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppStackScreen = () => (
  //   <AppStack.Navigator initialRouteName="Home">
  <Tab.Navigator initialRouteName="Scorecard">
    <Tab.Screen
      name="Courses"
      component={CourseScreen}
      options={{
        title: 'Courses',
        headerStyle: {
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
      }}
    />
    <Tab.Screen
      name="Scorecard"
      component={Scorecard}
      options={{
        title: 'Home',
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
          backgroundColor: 'blue',
        },
        headerTintColor: 'white',
      }}
    />
  </Tab.Navigator>
  //   </AppStack.Navigator>
);
const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log('token is', token);
        if (token !== null) {
          setSignedIn(true);
        }
      } catch (error) {
        console.error('Error fetching logged-in status:', error);
      }
    };

    fetchLoggedInStatus();
  }, []);

  return (
    <NavigationContainer>
      {signedIn === false ? <AuthStackScreen /> : <AppStackScreen />}
      {/* <AuthStackScreen /> */}
    </NavigationContainer>
  );
};

export default App;

// const styles = StyleSheet.create({});
