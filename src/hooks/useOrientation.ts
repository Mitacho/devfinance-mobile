import React from "react";

import {
  Dimensions,
  ScaledSize,
} from "react-native";

const window: ScaledSize = Dimensions.get("window");

interface useOrientationData {
  window: ScaledSize;
  isPortrait: boolean;
};

export default function useOrientation(): useOrientationData {
  const [ dimensions, setDimensions ] = React.useState<{ window: useOrientationData["window"]; }>({ window });

  React.useEffect(() => {
    function onChange({ window }: { window: ScaledSize; }): void {
      setDimensions({ window });
    };
    
    Dimensions.addEventListener("change", onChange);

    return () => Dimensions.removeEventListener("change", onChange);
  }, []);

  return {
    ...dimensions,
    isPortrait: dimensions.window.height > dimensions.window.width,
  };
};