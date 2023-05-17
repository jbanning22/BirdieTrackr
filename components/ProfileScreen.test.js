import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';
import {AuthContext} from '../AuthContext';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    CAMERA: 'camera',
  },
  check: jest.fn(),
  request: jest.fn(),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

describe('Profile Screen', () => {
  it('should match the snapshot', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    const {toJSON} = await render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('should display edit profile button', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    await render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Edit')).toBeTruthy();
  });
  it('should display sign out button', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    await render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Sign Out')).toBeTruthy();
  });
  it('should render FontAwesomeIcon', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    await render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(screen.queryAllByTestId('trash-icon')).toBeTruthy();
  });
});
