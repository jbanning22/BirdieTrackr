import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import LandingScreen from './LandingScreen';
import {AuthContext} from '../AuthContext';

describe('Landing Screen', () => {
  it('should match the snapshot', async () => {
    const authContext = {
      setOffline: jest.fn(),
    };
    const {toJSON} = render(
      <AuthContext.Provider value={authContext}>
        <LandingScreen />
      </AuthContext.Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render welcome message', async () => {
    const authContext = {
      setOffline: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContext}>
        <LandingScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Welcome to BirdieTrackr')).toBeTruthy();
  });
  it('should render offline switch', async () => {
    const authContext = {
      setOffline: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContext}>
        <LandingScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByTestId('offline-switch')).toBeTruthy();
  });
  it('should navigate to sign in screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const authContext = {
      setOffline: jest.fn(),
    };
    const {getByText} = render(
      <AuthContext.Provider value={authContext}>
        <LandingScreen navigation={navigation} />
      </AuthContext.Provider>,
    );
    fireEvent.press(getByText('Sign In with Email'));
    expect(navigation.navigate).toHaveBeenCalledWith('SignInPage');
  });
  it('should navigate to sign up screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const authContext = {
      setOffline: jest.fn(),
    };
    const {getByText} = render(
      <AuthContext.Provider value={authContext}>
        <LandingScreen navigation={navigation} />
      </AuthContext.Provider>,
    );
    fireEvent.press(getByText('Sign Up'));
    expect(navigation.navigate).toHaveBeenCalledWith('SignUpPage');
  });
});
