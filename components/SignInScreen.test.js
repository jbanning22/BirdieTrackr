import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import SignInScreen from './SignInScreen';
import {AuthContext} from '../AuthContext';

describe('Sign In Screen', () => {
  it('should match the snapshot', () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    const {toJSON} = render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen />
      </AuthContext.Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render title', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Sign In to DG Scorecard')).toBeTruthy();
  });
  it('should display log in button', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
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
      setSignedIn: jest.fn(),
    };
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen navigation={navigation} />
      </AuthContext.Provider>,
    );
    fireEvent.press(getByText('Back'));
    expect(navigation.navigate).toHaveBeenCalledWith('Landing');
  });
});
