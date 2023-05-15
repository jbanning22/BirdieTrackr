import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import CreateScorecard from './CreateScorecard';

describe('Create Scorecard Screen', () => {
  it('should render question on course name', () => {
    render(<CreateScorecard />);
    expect(screen.getByText('Name of the course?')).toBeTruthy();
  });
  it('should be able to input course name', () => {
    render(<CreateScorecard />);
    expect(screen.getByPlaceholderText('Course Name')).toBeTruthy();
  });
  it('should render question on course length', () => {
    render(<CreateScorecard />);
    expect(screen.getByText('How Many Holes?')).toBeTruthy();
  });
  it('should be able to input course length', () => {
    render(<CreateScorecard />);
    expect(screen.getByText('9')).toBeTruthy();
    expect(screen.getByText('18')).toBeTruthy();
  });
  it('should render button to create scorecard', () => {
    render(<CreateScorecard />);
    expect(screen.getByText('Create Scorecard')).toBeTruthy();
  });
  //   it('should display FullScorecard screen upon creation', async () => {
  //     const navigation = {
  //       navigate: jest.fn(),
  //     };
  //     const {getByText} = render(<CreateScorecard />);
  //     await fireEvent.press(getByText('Create Scorecard'));
  //     expect(navigation.navigate).toHaveBeenCalledWith('FullScorecard', {id: 1});
  //   });
});
