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
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));
jest.mock('@react-navigation/native-stack');

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
  it('should display avatar icon', async () => {
    render(<EditUserScreen />);
    expect(screen.queryAllByTestId('avatar-icon')).toBeTruthy();
  });

  it('should render the save button', async () => {
    render(<EditUserScreen />);
    await waitFor(() => {
      expect(screen.getByText('Save')).toBeTruthy();
    });
  });

  it('should update inputs correctly', async () => {
    const {getByTestId} = render(<EditUserScreen />);

    const usernameInput = getByTestId('username');
    const cityInput = getByTestId('city');
    const stateInput = getByTestId('state');
    const passwordInput = getByTestId('password');

    fireEvent.changeText(usernameInput, 'JohnDoe');
    fireEvent.changeText(cityInput, 'New York');
    fireEvent.changeText(stateInput, 'NY');
    fireEvent.changeText(passwordInput, 'password123');

    await waitFor(() => {
      expect(usernameInput.props.value).toBe('JohnDoe');
      expect(cityInput.props.value).toBe('New York');
      expect(stateInput.props.value).toBe('NY');
      expect(passwordInput.props.value).toBe('password123');
    });
  });
});
