import * as React from "react";
import { View, ViewProps } from "react-native";

import styles from "./BottomViewStyle";

interface Props extends ViewProps {
  children: React.ReactElement;
}

const Button: React.FunctionComponent<Props> = ({ children }: Props) => {
  return <View style={styles.container}>{children}</View>;
};

export default Button;
