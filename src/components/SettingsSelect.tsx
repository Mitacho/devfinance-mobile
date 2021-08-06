import React from "react";

import {
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";

import { ThemeContext } from "../theme";

interface Props {
  children: React.ReactNode;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  isSelected: boolean;
};

export default function SettingsButton({ children, onPress, isSelected }: Props): JSX.Element {
  const { theme } = React.useContext(ThemeContext);

  return(
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={{
          height: 42,
          width: 42,

          alignItems: "center",
          justifyContent: "center",

          borderRadius: 21,

          marginRight: 6,
          marginBottom: 4,

          backgroundColor: isSelected ? theme.colors.accentHighlight : "transparent",
        }}
      >
        { children }
      </View>
    </TouchableWithoutFeedback>
  );
};