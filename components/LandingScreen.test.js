import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import LandingScreen from './LandingScreen';

describe('Landing Screen', () => {
  it('should match the snapshot', async () => {
    const {toJSON} = render(<LandingScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render welcome message', async () => {
    render(<LandingScreen />);
    expect(screen.getByText('Welcome to DG Scorecard!')).toBeTruthy();
  });
  it('should navigate to sign in screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<LandingScreen navigation={navigation} />);
    fireEvent.press(getByText('Sign In with Email'));
    expect(navigation.navigate).toHaveBeenCalledWith('SignInPage');
  });
  it('should navigate to sign up screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<LandingScreen navigation={navigation} />);
    fireEvent.press(getByText('Sign Up'));
    expect(navigation.navigate).toHaveBeenCalledWith('SignUpPage');
  });
});
