import * as R from "ramda";
import * as React from "react";
import { Text, View, ViewProps } from "react-native";
import { Colors } from "../../Themes";
import AppThemeContext from "../../Themes/AppThemeContext";
import styles from "./HeaderStyle";

interface Props extends ViewProps {
  title?: string | React.ReactElement;
}

const Header: React.FunctionComponent<Props> = ({ title, style, ...props }: Props) => {
  return (
    <AppThemeContext.Consumer>
      {value => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: value === "dark" ? Colors.darkBlueHeader : Colors.white,
            },
            style,
          ]}
          {...props}
        >
          {R.is(String, title) ? (
            <Text numberOfLines={1} style={[styles.title, { color: value === "dark" ? Colors.white : Colors.black }]}>
              {title}
            </Text>
          ) : (
            { title }
          )}
        </View>
      )}
    </AppThemeContext.Consumer>
  );
};

export default Header;
