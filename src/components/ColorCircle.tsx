import React from "react";

import {
  View,
} from "react-native";

interface Props {
  fill: string;
};

export default function ColorCircle({ fill }: Props): JSX.Element {
  return(
    <View style={{
        height: 24,
        width: 24,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 21,

        backgroundColor: fill,
      }}
    />
  );
};