import { StyleSheet } from "react-native";
import { ApplicationStyles, Metrics } from "../../Themes";

export default StyleSheet.create({
  container: {
    height: Metrics.navBarHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    paddingRight: 5,
    ...ApplicationStyles.shadow,
  },
  title: {
    width: "80%",
    alignSelf: "center",
    position: "absolute",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
  },
  backIcon: {
    fontSize: 20,
  },
  backIconContainer: {
    paddingLeft: 15,
  },
  leftItem: {
    flex: 1,
  },
  rightItem: {
    flex: 1,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
