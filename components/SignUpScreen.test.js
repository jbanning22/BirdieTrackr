import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import SignUpScreen from './SignUpScreen';
import {AuthContext} from '../AuthContext';

describe('Sign Up Screen', () => {
  it('should render title', () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: true,
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignUpScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Join the IDISC Community!')).toBeTruthy();
  });
  it('should display sign up button', () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: true,
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignUpScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Sign Up')).toBeTruthy();
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
        <SignUpScreen navigation={navigation} />
      </AuthContext.Provider>,
    );
    await fireEvent.press(getByText('Back'));
    expect(navigation.navigate).toHaveBeenCalledWith('Landing');
  });
});
