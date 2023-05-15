import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import SignInScreen from './SignInScreen';
import {AuthContext} from '../AuthContext';

describe('Sign In Screen', () => {
  it('should render title', () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: true,
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Welcome Back!')).toBeTruthy();
  });
  it('should display log in button', () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: true,
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Log in')).toBeTruthy();
  });
  it('should navigate back to app landing', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: true,
    };
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen navigation={navigation} />
      </AuthContext.Provider>,
    );
    await fireEvent.press(getByText('Back'));
    expect(navigation.navigate).toHaveBeenCalledWith('Landing');
  });
});
