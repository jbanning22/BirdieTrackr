import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ThrowsScreen from './ThrowsScreen.jsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useGetThrowDetails} from './hooks/getThrowDataQuery.js';

jest.mock('axios');
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));
jest.mock('./hooks/getThrowDataQuery.js', () => ({
  useGetThrowDetails: jest.fn(),
}));

describe('Throws Screen', () => {
  let queryClient;
  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.setDefaultOptions({queries: {cacheTime: 0}});
    const mockThrowData = [
      {
        id: 5,
        createdAt: '2023-05-31T19:15:14.085Z',
        disc: 'Test',
        color: 'Test',
        throwtype: 'Test',
        distance: '281',
        userId: 1,
      },
    ];
    useGetThrowDetails.mockReturnValue({
      data: mockThrowData,
      isLoading: false,
      isError: false,
      error: null,
    });
  });
  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });
  it('should match the snapshot', () => {
    const {toJSON} = render(
      <QueryClientProvider client={queryClient}>
        <ThrowsScreen />
      </QueryClientProvider>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it('should display screen title', () => {
    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <ThrowsScreen />
      </QueryClientProvider>,
    );
    expect(getByText('Throws')).toBeTruthy();
  });
  it('should display measure throw button', async () => {
    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <ThrowsScreen />
      </QueryClientProvider>,
    );
    expect(getByText('Measure a Throw')).toBeTruthy();
  });
  it('should navigate to create throw screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(
      <QueryClientProvider client={queryClient}>
        <ThrowsScreen navigation={navigation} />
      </QueryClientProvider>,
    );
    fireEvent.press(getByText('Measure a Throw'));
    expect(navigation.navigate).toHaveBeenCalledWith('ThrowsScreen2');
  });
});
