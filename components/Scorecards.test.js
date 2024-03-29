import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import Scorecards from './Scorecards';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useGetScorecards} from './hooks/getScorecardsQuery';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));
jest.mock('@react-native-async-storage/async-storage');
jest.mock('./hooks/getScorecardsQuery', () => ({
  useGetScorecards: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: () => ({
    isConnected: true,
  }),
}));
jest.mock('axios');

describe('Scorecards Landing', () => {
  let queryClient;

  const mockedData = [
    {
      id: 3,
      createdAt: '2023-05-31T19:14:39.335Z',
      isCompleted: false,
      courseLength: 18,
      courseName: 'Test',
      playerId: 1,
      holes: [
        {
          id: 37,
          holeNumber: 1,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 38,
          holeNumber: 2,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 39,
          holeNumber: 3,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 40,
          holeNumber: 4,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 41,
          holeNumber: 5,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 42,
          holeNumber: 6,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 43,
          holeNumber: 7,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 44,
          holeNumber: 8,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 45,
          holeNumber: 9,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 46,
          holeNumber: 10,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 47,
          holeNumber: 11,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 48,
          holeNumber: 12,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 49,
          holeNumber: 13,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 50,
          holeNumber: 14,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 51,
          holeNumber: 15,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 52,
          holeNumber: 16,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 53,
          holeNumber: 17,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
        {
          id: 54,
          holeNumber: 18,
          par: 3,
          strokes: 0,
          playerId: 1,
          scorecardId: 3,
        },
      ],
    },
  ];
  beforeEach(() => {
    queryClient = new QueryClient();
    jest.useFakeTimers();

    queryClient.setDefaultOptions({
      queries: {cacheTime: 0},
      retry: false,
      refetchOnWindowFocus: false,
    });
    AsyncStorage.getItem.mockResolvedValue('dummy_token');
    useGetScorecards.mockReturnValue({
      data: mockedData,
      isLoading: false,
      isError: false,
      error: null,
    });
  });

  afterEach(() => {
    queryClient.clear();
    queryClient.removeQueries();
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(
      <QueryClientProvider client={queryClient}>
        <Scorecards />,
      </QueryClientProvider>,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should display welcome back message', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Scorecards />,
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Welcome back to BirdieTrackr!')).toBeTruthy();
    });
  });

  it('should display create scorecard button', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Scorecards />,
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(screen.getByText('Create Scorecard')).toBeTruthy();
    });
  });

  it('should navigate to create scorecard screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    render(
      <QueryClientProvider client={queryClient}>
        <Scorecards navigation={navigation} />,
      </QueryClientProvider>,
    );
    fireEvent.press(screen.getByText('Create Scorecard'));
    await waitFor(() => {
      expect(navigation.navigate).toHaveBeenCalledWith('CreateScorecard');
    });
  });
  it('should display correct course name', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Scorecards />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const courseName = screen.getByText(mockedData[0].courseName);

      expect(courseName).toBeTruthy();
    });
  });
  it('should display correct course length', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Scorecards />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const courseLength = screen.getByText(
        `${mockedData[0].courseLength} Holes`,
      );

      expect(courseLength).toBeTruthy();
    });
  });
  it('should render the correct number of scorecards', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Scorecards />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByText(/Holes/i)).toHaveLength(mockedData.length);
    });
  });
});
