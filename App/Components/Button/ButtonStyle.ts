import { StyleSheet } from "react-native";
import { Colors } from "../../Themes";

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.darkBlueHeader,
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    paddingVertical: 10,
    alignSelf: "center",
    flex: 1,
  },
});
