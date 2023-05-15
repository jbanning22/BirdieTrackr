import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import LandingScreen from './LandingScreen';

describe('Landing Screen', () => {
  it('should render welcome message', () => {
    render(<LandingScreen />);
    expect(screen.getByText('Welcome to IDISC!')).toBeTruthy();
  });
  it('should navigate to sign in screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<LandingScreen navigation={navigation} />);
    fireEvent.press(getByText('Sign In'));
    expect(navigation.navigate).toHaveBeenCalledWith('SignInPage');
  });
  it('should navigate to sign up screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<LandingScreen navigation={navigation} />);
    fireEvent.press(getByText('Sign Up'));
    expect(navigation.navigate).toHaveBeenCalledWith('SignUpPage');
  });
});
