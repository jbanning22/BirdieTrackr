import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CreateScorecard from './CreateScorecard';

describe('Create Scorecard Screen', () => {
  it('should match the snapshot', () => {
    const {toJSON} = render(<CreateScorecard />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render question on course name', async () => {
    await render(<CreateScorecard />);
    expect(screen.getByText('Name of the course?')).toBeTruthy();
  });
  it('should be able to input course name', async () => {
    await render(<CreateScorecard />);
    expect(screen.getByPlaceholderText('Course Name')).toBeTruthy();
  });
  it('should render question on course length', async () => {
    await render(<CreateScorecard />);
    expect(screen.getByText('How Many Holes?')).toBeTruthy();
  });
  it('should be able to input course length', async () => {
    await render(<CreateScorecard />);
    expect(screen.getByText('9')).toBeTruthy();
    expect(screen.getByText('18')).toBeTruthy();
  });
  it('should render button to create scorecard', async () => {
    await render(<CreateScorecard />);
    expect(screen.getByText('Create Scorecard')).toBeTruthy();
  });
});
