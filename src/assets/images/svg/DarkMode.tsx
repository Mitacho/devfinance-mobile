import React from "react";

import Svg, { Path } from "react-native-svg";

interface Props {
  height?: string | number;
  width?: string | number;
  fill: string;
};

export default function DarkModeSvg({ height, width, fill }: Props): JSX.Element {
  return (
    <Svg
      height={height || 24}
      viewBox="0 0 24 24"
      width={width || 24}
      fill={fill}
    >
      <Path fill="none" d="M0 0h24v24H0z" />
      <Path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
    </Svg>
  );
};