import React from "react";
import {fireEvent, render, screen} from "@testing-library/react-native";
import CreateThrowScreen from "./CreateThrow.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

jest.mock("axios");
jest.mock("@react-native-async-storage/async-storage");

describe("Create Throw Screen", () => {
	beforeEach(() => {
		AsyncStorage.getItem.mockResolvedValue("dummy_token");
		axios.get.mockResolvedValue({
			data: {
				id: 45,
				createdAt: "2023-05-24T14:25:42.716Z",
				disc: "boss",
				color: null,
				throwtype: "forehand",
				distance: "450",
				userId: 1,
			},
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});
	it("should match the snapshot", () => {
		const route = {
			params: {dist: 100},
		};
		const {toJSON} = render(<CreateThrowScreen route={route} />);
		expect(toJSON()).toMatchSnapshot();
	});
	it("should render title", () => {
		const route = {
			params: {dist: 100},
		};
		render(<CreateThrowScreen route={route} />);
		expect(screen.getByText("Measure Throw")).toBeTruthy();
	});
	it("should display create throw button", () => {
		const route = {
			params: {dist: 100},
		};
		render(<CreateThrowScreen route={route} />);
		expect(screen.getByText("Create Throw")).toBeTruthy();
	});
	it("should navigate back to throws screen upon throw creation", async () => {
		const route = {
			params: {dist: 100},
		};
		const navigation = {
			navigate: jest.fn(),
		};
		const {getByText} = render(
			<CreateThrowScreen route={route} navigation={navigation} />,
		);
		await fireEvent.press(getByText("Create Throw"));
		expect(navigation.navigate).toHaveBeenCalledWith("ThrowsScreen");
	});
});
