import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import ThrowsScreen from './ThrowsScreen.jsx';
import axios from 'axios';

jest.mock('axios');
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

describe('Throws Screen', () => {
  beforeEach(() => {
    const mockThrowData = [];
    act(() => {
      axios.get.mockImplementation(() =>
        Promise.resolve({data: mockThrowData}),
      );
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should match the snapshot', () => {
    const {toJSON} = render(<ThrowsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should display screen title', () => {
    const {getByText} = render(<ThrowsScreen />);
    expect(getByText('Throws')).toBeTruthy();
  });
  it('should display measure throw button', async () => {
    const {getByText} = render(<ThrowsScreen />);
    expect(getByText('Measure a Throw')).toBeTruthy();
  });
  it('should navigate to create throw screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<ThrowsScreen navigation={navigation} />);
    fireEvent.press(getByText('Measure a Throw'));
    expect(navigation.navigate).toHaveBeenCalledWith('ThrowsScreen2');
  });
});
