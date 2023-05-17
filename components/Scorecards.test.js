import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Scorecards from './Scorecards';
import axios from 'axios';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));
jest.mock('axios');

describe('Scorecards Landing', () => {
  it('should match the snapshot', () => {
    const {toJSON} = render(<Scorecards />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should display screen title', async () => {
    const mockScorecards = [];
    axios.get.mockImplementation(() => Promise.resolve({data: mockScorecards}));
    await render(<Scorecards />);
    expect(screen.getByText('Scorecards')).toBeTruthy();
  });
  it('should display create scorecard button', async () => {
    await render(<Scorecards />);
    expect(screen.getByText('Create Scorecard')).toBeTruthy();
  });
  it('should navigate to create scorecard screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = await render(<Scorecards navigation={navigation} />);
    await fireEvent.press(getByText('Create Scorecard'));
    expect(navigation.navigate).toHaveBeenCalledWith('CreateScorecard');
  });
});
