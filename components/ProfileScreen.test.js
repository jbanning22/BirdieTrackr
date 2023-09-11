import React from 'react';
import {render, screen} from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';
import {AuthContext} from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetUserDetails} from './hooks/getUserDataQuery';

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
jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('./hooks/getUserDataQuery');

describe('Profile Screen', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue('dummy_token');
    useGetUserDetails.mockReturnValue({
      data: {
        id: 1,
        firstName: 'Jack',
        lastName: 'Banning',
        userName: 'JBanning',
        city: null,
        state: null,
        email: 'jtest@email.com',
      },
      isLoading: false,
      isError: false,
      error: null,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display sign out button', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('Log Out')).toBeTruthy();
  });
  it('should display username', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(screen.getByText('JBanning')).toBeTruthy();
  });
  it('should render edit profile icon', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(screen.queryAllByTestId('pencil-icon')).toBeTruthy();
  });
  it('should render trash icon', async () => {
    const authContextValue = {
      signedIn: true,
      setSignedIn: jest.fn(),
    };
    render(
      <AuthContext.Provider value={authContextValue}>
        <ProfileScreen />
      </AuthContext.Provider>,
    );
    expect(screen.queryAllByTestId('trash-icon')).toBeTruthy();
  });
});
