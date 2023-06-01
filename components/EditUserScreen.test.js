import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import EditUserScreen from './EditUserScreen';
import {useMutation} from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

describe('Edit User Screen', () => {
  beforeEach(() => {
    useMutation.mockReturnValue([
      jest.fn().mockResolvedValue({data: {success: true}}),
      {isLoading: false, isError: false, error: null},
    ]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should match the snapshot', async () => {
    const {toJSON} = render(<EditUserScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render screen title', async () => {
    render(<EditUserScreen />);
    await waitFor(() => {
      expect(screen.getByText('Edit Profile')).toBeTruthy();
    });
  });
  it('should render the edit button', async () => {
    render(<EditUserScreen />);
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeTruthy();
    });
  });

  it('should update inputs correctly', async () => {
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

    await waitFor(() => {
      expect(usernameInput.props.value).toBe('JohnDoe');
      expect(firstNameInput.props.value).toBe('John');
      expect(lastNameInput.props.value).toBe('Doe');
      expect(cityInput.props.value).toBe('New York');
      expect(stateInput.props.value).toBe('NY');
      expect(passwordInput.props.value).toBe('password123');
    });
  });
  it('should navigate back to profile landing on press', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<EditUserScreen navigation={navigation} />);
    fireEvent.press(getByText('Back'));
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('ProfileLanding');
    });
  });
});
