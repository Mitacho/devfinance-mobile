import React from "react";

import Svg, { Path } from "react-native-svg";

interface Props {
  height?: string | number;
  width?: string | number;
  fill?: string;
};

export default function IncomeSvg({ height, width, fill }: Props): JSX.Element {
  return (
    <Svg
      height={height || 24}
      viewBox="0 0 24 24"
      width={width || 24}
      fill={fill}
    >
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </Svg>
  );
};