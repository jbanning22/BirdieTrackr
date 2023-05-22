import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import CreateThrowScreen from './CreateThrow';

describe('Create Throw Screen', () => {
  it('should match the snapshot', () => {
    const route = {
      params: {dist: 100},
    };
    const {toJSON} = render(<CreateThrowScreen route={route} />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should render title', () => {
    const route = {
      params: {dist: 100},
    };
    render(<CreateThrowScreen route={route} />);
    expect(screen.getByText('Measure Throw')).toBeTruthy();
  });
  it('should display create throw button', () => {
    const route = {
      params: {dist: 100},
    };
    render(<CreateThrowScreen route={route} />);
    expect(screen.getByText('Create Throw')).toBeTruthy();
  });
  //   it('should navigate back to throws screen upon throw creation', async () => {
  //     const route = {
  //       params: {dist: 100},
  //     };
  //     const navigation = {navigate: jest.fn()};

  //     await render(<CreateThrowScreen route={route} navigation={navigation} />);
  //     await fireEvent.press(screen.getByText('Create Throw'));
  //     expect(navigation.navigate).toHaveBeenCalledWith('ThrowsScreen');
  //   });
});
