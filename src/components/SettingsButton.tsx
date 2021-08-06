import React from "react";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  View,
  TouchableWithoutFeedback,
} from "react-native";

import SettingsSvg from "../assets/images/svg/Settings";

import { ThemeContext } from "../theme";

import { StackParamList } from "../navigation/navigator.types";

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, "Settings" | "Home">;
};

export default function SettingsButton({ navigation }: Props): JSX.Element {
  const { theme } = React.useContext(ThemeContext);

  return(
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Settings")}
    >
      <View style={{ padding: 4 }}>
        <SettingsSvg
          fill={theme.colors.icon}
          height={24}
          width={24}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};