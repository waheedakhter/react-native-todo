import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors } from "../../Themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  inputStyle: {
    height: 200,
    borderRadius: 20,
    margin: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
    ...ApplicationStyles.shadow,
  },
  selectedDate: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 18,
  },
});
