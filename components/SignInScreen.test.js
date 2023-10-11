import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SignInScreen from './SignInScreen';
import {AuthContext} from '../AuthContext';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

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
    expect(screen.getByText('Sign In to BirdieTrackr')).toBeTruthy();
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
    expect(screen.getByText('Sign in')).toBeTruthy();
  });
  it('should display forgot password', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Forgot Password?')).toBeTruthy();
  });
  it('should display legal text', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    const {getByText} = render(
      <AuthContext.Provider value={authContextValue}>
        <SignInScreen />
      </AuthContext.Provider>,
    );
    const text1 = getByText('Privacy Policy');
    const text2 = getByText('BirdieTrackr Terms & Conditions');

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
  });
});
