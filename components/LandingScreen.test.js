import React from "react";
import {render, screen, fireEvent} from "@testing-library/react-native";
import LandingScreen from "./LandingScreen";

describe("Landing Screen", () => {
	it("should match the snapshot", () => {
		const {toJSON} = render(<LandingScreen />);
		expect(toJSON()).toMatchSnapshot();
	});
	it("should render welcome message", async () => {
		await render(<LandingScreen />);
		expect(screen.getByText("Welcome to IDISC!")).toBeTruthy();
	});
	it("should navigate to sign in screen", async () => {
		const navigation = {
			navigate: jest.fn(),
		};
		const {getByText} = await render(<LandingScreen navigation={navigation} />);
		fireEvent.press(getByText("Sign In"));
		expect(navigation.navigate).toHaveBeenCalledWith("SignInPage");
	});
	it("should navigate to sign up screen", async () => {
		const navigation = {
			navigate: jest.fn(),
		};
		const {getByText} = await render(<LandingScreen navigation={navigation} />);
		fireEvent.press(getByText("Sign Up"));
		expect(navigation.navigate).toHaveBeenCalledWith("SignUpPage");
	});
});
