import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");

jest.mock("react-native/Libraries/Utilities/Platform", () => {
  const platform = jest.requireActual("react-native/Libraries/Utilities/Platform");
  return {
    ...platform,
    constants: {
      ...platform.constants,
      reactNativeVersion: {
        major: 0,
        minor: 65,
        patch: 1,
      },
    },
  };
});

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});
