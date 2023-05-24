import React from "react";
import {render, screen} from "@testing-library/react-native";
import ProfileScreen from "./ProfileScreen";
import {AuthContext} from "../AuthContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
	FontAwesomeIcon: () => null,
}));
jest.mock("react-native-permissions", () => ({
	PERMISSIONS: {
		CAMERA: "camera",
	},
	check: jest.fn(),
	request: jest.fn(),
}));
jest.mock("react-native-image-picker", () => ({
	launchImageLibrary: jest.fn(),
}));
jest.mock("axios");
jest.mock("@react-native-async-storage/async-storage");

describe("Profile Screen", () => {
	beforeEach(() => {
		AsyncStorage.getItem.mockResolvedValue("dummy_token");
		axios.get.mockResolvedValue({
			data: {
				id: 1,
				firstName: "Jack",
				lastName: "Banning",
				userName: "JBanning",
				city: null,
				state: null,
				email: "jtest@email.com",
			},
		});
	});
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should match the snapshot", async () => {
		const authContextValue = {
			signedIn: true,
			setSignedIn: jest.fn(),
		};
		const {toJSON} = render(
			<AuthContext.Provider value={authContextValue}>
				<ProfileScreen />
			</AuthContext.Provider>,
		);
		expect(toJSON()).toMatchSnapshot();
	});
	it("should display edit profile button", async () => {
		const authContextValue = {
			signedIn: true,
			setSignedIn: jest.fn(),
		};
		render(
			<AuthContext.Provider value={authContextValue}>
				<ProfileScreen />
			</AuthContext.Provider>,
		);
		expect(screen.getByText("Edit")).toBeTruthy();
	});
	it("should display sign out button", async () => {
		const authContextValue = {
			signedIn: true,
			setSignedIn: jest.fn(),
		};
		render(
			<AuthContext.Provider value={authContextValue}>
				<ProfileScreen />
			</AuthContext.Provider>,
		);
		expect(screen.getByText("Sign Out")).toBeTruthy();
	});
	it("should render FontAwesomeIcon", async () => {
		const authContextValue = {
			signedIn: true,
			setSignedIn: jest.fn(),
		};
		render(
			<AuthContext.Provider value={authContextValue}>
				<ProfileScreen />
			</AuthContext.Provider>,
		);
		expect(screen.queryAllByTestId("trash-icon")).toBeTruthy();
	});
});
