import * as React from "react";
import { Text, TouchableOpacity, ViewProps } from "react-native";
import styles from "./ButtonStyle";

interface Props extends ViewProps {
  text: string;
  onPress: () => void;
}

const Button: React.FunctionComponent<Props> = ({ text, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
