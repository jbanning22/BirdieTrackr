import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import CreateThrowScreen from './CreateThrow.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');

describe('Create Throw Screen', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.setDefaultOptions({queries: {cacheTime: 0}});
    AsyncStorage.getItem.mockResolvedValue('dummy_token');
  });
  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('should match the snapshot', async () => {
    const route = {
      params: {dist: 100},
    };
    const {toJSON} = render(
      <QueryClientProvider client={queryClient}>
        <CreateThrowScreen route={route} />
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it('should render title', async () => {
    const route = {
      params: {dist: 100},
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CreateThrowScreen route={route} />
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Measure Throw')).toBeTruthy();
    });
  });
  it('should display create throw button', async () => {
    const route = {
      params: {dist: 100},
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CreateThrowScreen route={route} />
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Create Throw')).toBeTruthy();
    });
  });
  it('should navigate back to throws screen upon throw creation', async () => {
    const route = {
      params: {dist: 100},
    };
    const navigation = {
      navigate: jest.fn(),
    };
    render(
      <QueryClientProvider client={queryClient}>
        <CreateThrowScreen route={route} navigation={navigation} />
      </QueryClientProvider>,
    );
    fireEvent.press(screen.getByText('Create Throw'));
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('ThrowsScreen');
    });
  });
});
