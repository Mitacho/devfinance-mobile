import React from "react";

import Svg, { Path } from "react-native-svg";

interface Props {
  height?: string | number;
  width?: string | number;
  fill?: string;
};

export default function BalanceSvg({ height, width, fill }: Props): JSX.Element {
  return (
    <Svg
      height={height || 24}
      viewBox="0 0 24 24"
      width={width || 24}
      fill={fill}
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z" />
    </Svg>
  );
};