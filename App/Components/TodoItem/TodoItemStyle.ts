import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors } from "../../Themes";
import colors from "../../Themes/Colors";

export default StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  label: { flex: 1, color: colors.darkGrey },
  value: {
    flex: 2,
    textAlign: "right",
  },
  itemContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    ...ApplicationStyles.shadow,
  },
  description: { fontSize: 30 },
  dateStyle: { fontSize: 20, color: Colors.darkGrey },
  btnViewStyle: {
    backgroundColor: Colors.darkRed,
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
  },
  deleteView: {
    justifyContent: "center",
    width: 100,
    alignItems: "center",
  },
  textStyle: {
    fontSize: 12,
    color: "white",
  },
});
