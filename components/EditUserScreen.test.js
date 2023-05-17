import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import EditUserScreen from './EditUserScreen';
import axios from 'axios';

describe('Edit User Screen', () => {
  it('should match the snapshot', () => {
    const {toJSON} = render(<EditUserScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render screen title', () => {
    render(<EditUserScreen />);
    expect(screen.getByText('Edit Profile')).toBeTruthy();
  });
  it('should render the edit button', () => {
    render(<EditUserScreen />);
    expect(screen.getByText('Edit')).toBeTruthy();
  });

  it('should update inputs correctly', () => {
    const {getByPlaceholderText} = render(<EditUserScreen />);

    const usernameInput = getByPlaceholderText('Username');
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const cityInput = getByPlaceholderText('City');
    const stateInput = getByPlaceholderText('State');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(usernameInput, 'JohnDoe');
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(cityInput, 'New York');
    fireEvent.changeText(stateInput, 'NY');
    fireEvent.changeText(passwordInput, 'password123');

    expect(usernameInput.props.value).toBe('JohnDoe');
    expect(firstNameInput.props.value).toBe('John');
    expect(lastNameInput.props.value).toBe('Doe');
    expect(cityInput.props.value).toBe('New York');
    expect(stateInput.props.value).toBe('NY');
    expect(passwordInput.props.value).toBe('password123');
  });
  it('should call editUser function on button press', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const mockPatch = jest.spyOn(axios, 'patch');
    mockPatch.mockResolvedValueOnce({data: {success: true}});

    const {getByText} = render(<EditUserScreen navigation={navigation} />);

    const editButton = getByText('Edit');
    fireEvent.press(editButton);

    await waitFor(() => expect(mockPatch).toHaveBeenCalled());

    expect(navigation.navigate).toHaveBeenCalledWith('ProfileLanding');
  });

  it('should navigate back to profile landing on press', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<EditUserScreen navigation={navigation} />);
    fireEvent.press(getByText('Back'));
    expect(navigation.navigate).toHaveBeenCalledWith('ProfileLanding');
  });
});
