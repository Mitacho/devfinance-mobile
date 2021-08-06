import { StatusBarStyle } from "react-native";

export type Theme = {
  title: string;

  colors: {
    statusBar: string;
    statusContent: StatusBarStyle | null | undefined;

    headerStyle: string;
    headerTintColor: string;

    background: string;

    text: string;
    placeholder: string;

    input: string;
    inputBorder: string;
    feedback: string;
    
    accent: string;
    accentHighlight: string;

    icon: string;
  };
};