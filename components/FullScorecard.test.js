import React from "react";
import {fireEvent, render, screen} from "@testing-library/react-native";
import FullScorecard from "./FullScorecard";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
	FontAwesomeIcon: () => null,
}));

jest.mock("axios");
jest.mock("@react-native-async-storage/async-storage");

describe("Full Scorecard Screen", () => {
	beforeEach(() => {
		AsyncStorage.getItem.mockResolvedValue("dummy_token");

		axios.get.mockResolvedValue({
			data: {
				id: 2,
				createdAt: "2023-05-24T14:03:28.112Z",
				isCompleted: false,
				courseLength: 18,
				courseName: "white clay2",
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
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should match the snapshot", () => {
		const route = {
			params: {id: 1},
		};
		const {toJSON} = render(<FullScorecard route={route} />);
		expect(toJSON()).toMatchSnapshot();
	});
	it("should render screen title", () => {
		const route = {
			params: {id: 1},
		};
		render(<FullScorecard route={route} />);
		expect(screen.getByText("Scorecard")).toBeTruthy();
	});
	it("should display back button", () => {
		const route = {
			params: {id: 1},
		};
		render(<FullScorecard route={route} />);
		expect(screen.getByText("Back")).toBeTruthy();
	});
	it("should navigate back to scorecards screen", () => {
		const navigation = {
			navigate: jest.fn(),
		};
		const route = {
			params: {id: 2},
		};
		const {getByText} = render(
			<FullScorecard route={route} navigation={navigation} />,
		);
		fireEvent.press(getByText("Back"));
		expect(navigation.navigate).toHaveBeenCalledWith("Scorecard");
	});
});
