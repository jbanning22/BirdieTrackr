import React, {useState, useEffect, useDebugValue} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './components/LandingScreen';
import SignInScreen from './components/SignInScreen';
import SignUpScreen from './components/SignUpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScorecardStack from './components/ScorecardStack';
import OfflineScorecardStack from './components/OfflineScorecardStack';
import OfflineThrowsStack from './components/OfflineThrowsStack';
import ProfileStack from './components/ProfileStack';
import axios from 'axios';
import {AuthContext} from './AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ThrowsStack from './components/ThrowsStack';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faRuler} from '@fortawesome/free-solid-svg-icons/faRuler';
import {faRectangleList} from '@fortawesome/free-regular-svg-icons/faRectangleList';
import SplashScreen from 'react-native-splash-screen';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import {Alert} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
// import SplashScreen from 'react-native-splash-screen';
import {enableLatestRenderer} from 'react-native-maps';
enableLatestRenderer();

const SERVER_URL = 'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName="Landing">
    <AuthStack.Screen
      name="Landing"
      component={LandingScreen}
      options={{
        title: 'Get Started',
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="SignInPage"
      component={SignInScreen}
      options={{
        headerShown: false,
      }}
    />
    <AuthStack.Screen
      name="SignUpPage"
      component={SignUpScreen}
      options={{
        headerShown: false,
      }}
    />
  </AuthStack.Navigator>
);

const OfflineStackScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Scorecards">
      <Tab.Screen
        name="Scorecards"
        component={OfflineScorecardStack}
        options={{
          title: 'Scorecards',
          tabBarLabelStyle: {color: '#2D6061'},
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faRectangleList}
              color={focused ? '#2D6061' : 'black'}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Throws"
        component={OfflineThrowsStack}
        options={{
          title: 'Throws',
          tabBarLabelStyle: {color: '#2D6061'},
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faRuler}
              color={focused ? '#2D6061' : 'black'}
              size={20}
            />
          ),
          headerShown: false,
          headerTintColor: 'white',
        }}
      />
    </Tab.Navigator>
  );
};

const AppStackScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
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
          tabBarLabelStyle: {color: '#2D6061'},
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faRectangleList}
              color={focused ? '#2D6061' : 'black'}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Throws"
        component={ThrowsStack}
        options={{
          title: 'Throws',
          tabBarLabelStyle: {color: '#2D6061'},
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faRuler}
              color={focused ? '#2D6061' : 'black'}
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
          tabBarLabelStyle: {color: '#2D6061'},
          tabBarIcon: ({focused}) => (
            <FontAwesomeIcon
              icon={faUser}
              color={focused ? '#2D6061' : 'black'}
              size={20}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  SplashScreen.hide();
  const [signedIn, setSignedIn] = useState(false);
  const [offline, setOffline] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const queryClient = new QueryClient();
  const netInfo = useNetInfo();
  const authContextValue = {
    signedIn,
    setSignedIn,
  };
  const offlineContextValue = {
    offline,
    setOffline,
  };
  useEffect(() => {
    refreshAccess();
  }, [signedIn, offline]);
  useEffect(() => {
    if (netInfo.isConnected) {
      checkServerConnection();
      setIsConnected(true);
    }
  }, []);

  const checkServerConnection = () => {
    fetch(SERVER_URL)
      .then(async response => {
        if (response.ok) {
          console.log('Successfully connected to the server! ');
        } else {
          console.log('Server returned an error:', response.statusText);
          setIsConnected(false);
        }
      })
      .catch(error => {
        Alert.alert('Server offline.\nPlease use offline mode.');
        setIsConnected(false);
      });
  };
  const refreshAccess = async () => {
    const reToken = await AsyncStorage.getItem('ReToken');
    try {
      const refresh = await axios.post(
        'http://ec2-54-173-139-185.compute-1.amazonaws.com:3000/auth/refresh',
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
      // console.log('error signing in', error);
    }
  };

  const RootStack = createNativeStackNavigator();
  return (
    <AuthContext.Provider value={{...authContextValue, ...offlineContextValue}}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack.Navigator>
            {offline === true ? (
              <RootStack.Screen
                name="OfflineApp"
                component={OfflineStackScreen}
                options={{headerShown: false}}
              />
            ) : signedIn === false ? (
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
