import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Scorecards from './Scorecards';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage');

describe('Scorecards Landing', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue('dummy_token');

    axios.get.mockResolvedValue({
      data: [
        {
          id: 2,
          createdAt: '2023-05-24T14:03:28.112Z',
          isCompleted: false,
          courseLength: 18,
          courseName: 'white clay2',
          playerId: 1,
          holes: [
            {
              id: 19,
              holeNumber: 1,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 20,
              holeNumber: 2,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 21,
              holeNumber: 3,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 22,
              holeNumber: 4,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 23,
              holeNumber: 5,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 24,
              holeNumber: 6,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 25,
              holeNumber: 7,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 26,
              holeNumber: 8,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 27,
              holeNumber: 9,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 28,
              holeNumber: 10,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 29,
              holeNumber: 11,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 30,
              holeNumber: 12,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 31,
              holeNumber: 13,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 32,
              holeNumber: 14,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 33,
              holeNumber: 15,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 34,
              holeNumber: 16,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 35,
              holeNumber: 17,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
            {
              id: 36,
              holeNumber: 18,
              par: 3,
              strokes: 0,
              playerId: 1,
              scorecardId: 2,
            },
          ],
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(<Scorecards />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should display screen title', async () => {
    render(<Scorecards />);
    expect(screen.getByText('Scorecards')).toBeTruthy();
  });

  it('should display create scorecard button', async () => {
    render(<Scorecards />);
    expect(screen.getByText('Create Scorecard')).toBeTruthy();
  });

  it('should navigate to create scorecard screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<Scorecards navigation={navigation} />);
    fireEvent.press(getByText('Create Scorecard'));
    expect(navigation.navigate).toHaveBeenCalledWith('CreateScorecard');
  });
});
