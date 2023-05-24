jest.mock("react-native-permissions", () => {
	return {
		PERMISSIONS: {
			// Mock the necessary permissions here
		},
		check: jest.fn(),
		request: jest.fn(),
		// Mock any other functions you need to use in your tests
	};
});
