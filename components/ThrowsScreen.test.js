<<<<<<< Updated upstream
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ThrowsScreen from './ThrowsScreen';
import axios from 'axios';
=======
import React from "react";
import {render, fireEvent, act} from "@testing-library/react-native";
import ThrowsScreen from "./ThrowsScreen.jsx";
import axios from "axios";
>>>>>>> Stashed changes

jest.mock("axios");
jest.mock("@fortawesome/react-native-fontawesome", () => ({
	FontAwesomeIcon: () => null,
}));

<<<<<<< Updated upstream
describe('Throws Screen', () => {
  beforeEach(() => {
    const mockThrowData = [];
    axios.get.mockImplementation(() => Promise.resolve({data: mockThrowData}));
  });
  it('should match the snapshot', () => {
    const {toJSON} = render(<ThrowsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('should display screen title', () => {
    const {getByText} = render(<ThrowsScreen />);
    expect(getByText('Throws')).toBeTruthy();
  });
  it('should display measure throw button', async () => {
    const {getByText} = await render(<ThrowsScreen />);
    expect(getByText('Measure a Throw')).toBeTruthy();
  });
  it('should navigate to create throw screen', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const {getByText} = await render(<ThrowsScreen navigation={navigation} />);
    await fireEvent.press(getByText('Measure a Throw'));
    expect(navigation.navigate).toHaveBeenCalledWith('ThrowsScreen2');
  });
=======
describe("Throws Screen", () => {
	beforeEach(() => {
		const mockThrowData = [];
		act(() => {
			axios.get.mockImplementation(() =>
				Promise.resolve({data: mockThrowData}),
			);
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("should match the snapshot", () => {
		const {toJSON} = render(<ThrowsScreen />);
		expect(toJSON()).toMatchSnapshot();
	});
	it("should display screen title", () => {
		const {getByText} = render(<ThrowsScreen />);
		expect(getByText("Throws")).toBeTruthy();
	});
	it("should display measure throw button", async () => {
		const {getByText} = await render(<ThrowsScreen />);
		expect(getByText("Measure a Throw")).toBeTruthy();
	});
	it("should navigate to create throw screen", async () => {
		const navigation = {
			navigate: jest.fn(),
		};
		const {getByText} = await render(<ThrowsScreen navigation={navigation} />);
		await fireEvent.press(getByText("Measure a Throw"));
		expect(navigation.navigate).toHaveBeenCalledWith("ThrowsScreen2");
	});
>>>>>>> Stashed changes
});
