import React from "react";

import {
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useOrientation from "../hooks/useOrientation";

import { ThemeContext } from "../theme";

import { formatCurrency } from "../utils/currency";

import { StackParamList } from "../navigation/navigator.types";

interface Props {
  type: string;
  amount: number;
  icon?: JSX.Element;
  highlight?: boolean;
  navigation?: NativeStackNavigationProp<StackParamList, "Home" | "Settings" | "AddTransaction">;
  navigateTo?: "Home" | "Settings" | "AddTransaction";
};

export default function Card(props: Props): JSX.Element {
  const { theme } = React.useContext(ThemeContext);

  const { window } = useOrientation();

  return(
    <TouchableWithoutFeedback
      onPress={() => props.navigation?.navigate(props.navigateTo ? props.navigateTo : "Settings")}
    >
      <View
        style={[{
          width: window.width > 800 ? 225 : "90%",
          height: 160,

          justifyContent: "space-between",
      
          paddingVertical: 24,
          paddingHorizontal: 32,
          marginBottom: 16,
      
          borderRadius: 4,

          backgroundColor: props.highlight ? theme.colors.accentHighlight : theme.colors.accent,
        }]}
      >
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
            }
          ]}
        >
          <Text style={[{ color: theme.colors.text }]}>
            {props.type}
          </Text>
          <View
            style={[
              {
                alignItems: "center",
                justifyContent: "center",

                height: 42,
                width: 42,
              }
            ]}
          >
            { props.icon }
          </View>
        </View>
        <View
          style={[{ height: 52 }]}
        >
          <Text
            numberOfLines={1}
            style={[
              {
                flex: 1,

                color: theme.colors.text,

                textAlignVertical: "center",

                fontSize: 32,
              }
            ]}
          >
            {formatCurrency(props.amount)}
          </Text>
        </View>
      </View>    
    </TouchableWithoutFeedback>
  );
};