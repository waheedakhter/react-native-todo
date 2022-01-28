import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Colors } from "../../Themes";
import AppNavigation from "../../Navigation/AppNavigation";
// Styles
import styles from "./RootContainerStyles";

const AppStack = createStackNavigator();

function AppNavigationContainer() {
  return (
    <AppStack.Navigator initialRouteName="Main" headerMode={"none"} mode={"card"}>
      <AppStack.Screen name="Main" component={AppNavigation} />
    </AppStack.Navigator>
  );
}

const RootContainer: React.FunctionComponent = ({}) => {
  return (
    <SafeAreaView style={styles.applicationView}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlueHeader} />
      <AppNavigationContainer />
    </SafeAreaView>
  );
};

export default RootContainer;
