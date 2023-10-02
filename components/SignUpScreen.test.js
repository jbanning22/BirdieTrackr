import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SignUpScreen from './SignUpScreen';
import {AuthContext} from '../AuthContext';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

describe('Sign Up Screen', () => {
  it('should match the snapshot', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    const {toJSON} = render(
      <AuthContext.Provider value={authContextValue}>
        <SignUpScreen />
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
        <SignUpScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Welcome to AceTracker')).toBeTruthy();
  });
  it('should display sign up button', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignUpScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Sign Up')).toBeTruthy();
  });
  it('should sign up message', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <SignUpScreen />
      </AuthContext.Provider>,
    );
    expect(
      screen.getByText('Create a commitment-free profile to explore products.'),
    ).toBeTruthy();
  });
  it('should display legal text', async () => {
    const authContextValue = {
      signedIn: false,
      setSignedIn: jest.fn(),
    };
    const {getByText} = render(
      <AuthContext.Provider value={authContextValue}>
        <SignUpScreen />
      </AuthContext.Provider>,
    );
    const text1 = getByText('Privacy Policy');
    const text2 = getByText('AceTracker Terms & Conditions');

    expect(text1).toBeDefined();
    expect(text2).toBeDefined();
  });
});
