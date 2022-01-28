import { Dimensions, StyleSheet } from "react-native";
import { Metrics } from "../../Themes";

export default StyleSheet.create({
  contentContainer: {
    height: Metrics.screenHeight,
  },
  emptyListComponent: {
    height: Dimensions.get("window").height,
    justifyContent: "center",
  },
  emptyListComponentText: {
    textAlign: "center",
  },
});
