import React from 'react';
import {render, screen, waitFor} from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';
import {PERMISSIONS} from 'react-native-permissions';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));
jest.mock('react-native-permissions', () => ({
  PERMISSIONS: {
    CAMERA: 'camera',
  },
  check: jest.fn(),
  request: jest.fn(),
}));
describe('Profile Screen', () => {
  //   it('should match the snapshot', () => {
  //     const {toJSON} = render(<ProfileScreen />);
  //     expect(toJSON()).toMatchSnapshot();
  //   });
//   it('should display edit profile button', async () => {
//     PERMISSIONS.check.mockResolvedValueOnce('denied');
//     render(<ProfileScreen />);
//     await waitFor(() => {
//       expect(screen.getByText('Edit')).toBeTruthy();
//     });
  });
  //   it('should display username', async () => {
  //     const userDetails = {
  //       userName: 'JackB',
  //       firstName: 'Jack',
  //       lastName: 'Banning',
  //       city: 'Newark',
  //       state: 'DE',
  //     };
  //     // axios.get.mockResolvedValueOnce({data: userDetails});
  //     axios.get.mockImplementation(() => Promise.resolve({data: userDetails}));

  //     const {getByText} = await render(<ProfileScreen />);

  //     await waitFor(() => {
  //       const usernameElement = getByText('JackB');
  //       expect(usernameElement).toBeTruthy();
  //     });
  //   });
});
