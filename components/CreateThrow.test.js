import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import CreateThrowScreen from './CreateThrow.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

describe('Create Throw Screen', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.setDefaultOptions({
      queries: {cacheTime: 0},
      retry: false,
      refetchOnWindowFocus: false,
    });
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
});
