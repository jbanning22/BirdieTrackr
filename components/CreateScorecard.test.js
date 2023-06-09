import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CreateScorecard from './CreateScorecard';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import axios from 'axios';

jest.mock('axios');
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

describe('Create Scorecard Screen', () => {
  let queryClient;
  beforeEach(() => {
    queryClient = new QueryClient();
    queryClient.setDefaultOptions({
      queries: {cacheTime: 0},
      retry: false,
      refetchOnWindowFocus: false,
    });
    axios.post.mockResolvedValue({
      data: {
        id: 1,
      },
    });
  });
  afterEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });
  it('should match the snapshot', async () => {
    const {toJSON} = render(
      <QueryClientProvider client={queryClient}>
        <CreateScorecard />
      </QueryClientProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render question title', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateScorecard />
      </QueryClientProvider>,
    );
    expect(screen.getByText('Where are you playing?')).toBeTruthy();
  });
  it('should render question on course name', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateScorecard />
      </QueryClientProvider>,
    );
    expect(screen.getByText('Name of the Course')).toBeTruthy();
  });
  it('should be able to input course name', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateScorecard />
      </QueryClientProvider>,
    );
    expect(screen.getByPlaceholderText('Course Name')).toBeTruthy();
  });
  it('should render question on course length', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateScorecard />
      </QueryClientProvider>,
    );
    expect(screen.getByText('How Many Holes?')).toBeTruthy();
  });
  it('should be able to input course length', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateScorecard />
      </QueryClientProvider>,
    );
    expect(screen.getByText('9')).toBeTruthy();
    expect(screen.getByText('18')).toBeTruthy();
  });
  it('should render button to create scorecard', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CreateScorecard />
      </QueryClientProvider>,
    );
    expect(screen.getByText('Create Scorecard')).toBeTruthy();
  });
});
