import React from "react";

import Svg, { Path } from "react-native-svg";

interface Props {
  height?: string | number;
  width?: string | number;
  fill?: string;
};

export default function RemoveSvg({ height, width, fill }: Props): JSX.Element {
  return (
    <Svg
      height={height || 24}
      viewBox="0 0 24 24"
      width={width || 24}
      fill={fill}
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </Svg>
  );
};