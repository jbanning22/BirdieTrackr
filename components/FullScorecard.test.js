import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import FullScorecard from './FullScorecard';

describe('Full Scorecard Screen', () => {
  it('should match the snapshot', () => {
    const route = {
      params: {id: 1},
    };
    const {toJSON} = render(<FullScorecard route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render screen title', () => {
    const route = {
      params: {id: 1},
    };
    render(<FullScorecard route={route} />);
    expect(screen.getByText('Scorecard')).toBeTruthy();
  });
  it('should display back button', () => {
    const route = {
      params: {id: 1},
    };
    render(<FullScorecard route={route} />);
    expect(screen.getByText('Back')).toBeTruthy();
  });
  it('should navigate backk to scorecards screen', () => {
    const route = {
      params: {id: 1},
    };
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = render(
      <FullScorecard route={route} navigation={navigation} />,
    );
    fireEvent.press(getByText('Back'));
    expect(navigation.navigate).toHaveBeenCalledWith('Scorecard');
  });
});
