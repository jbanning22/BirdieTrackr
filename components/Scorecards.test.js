import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Scorecards from './Scorecards';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

describe('Scorecards Landing', () => {
  it('should display screen title', () => {
    render(<Scorecards />);
    expect(screen.getByText('Scorecards')).toBeTruthy();
  });
  it('should display create scorecard button', () => {
    render(<Scorecards />);
    expect(screen.getByText('Create Scorecard')).toBeTruthy();
  });
  it('should navigate to create scorecard screen', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(<Scorecards navigation={navigation} />);
    fireEvent.press(getByText('Create Scorecard'));
    expect(navigation.navigate).toHaveBeenCalledWith('CreateScorecard');
  });
});
