import React from "react";

import DarkModeSvg from "../assets/images/svg/DarkMode";
import LightModeSvg from "../assets/images/svg/LightMode";
import ColorCircle from "../components/ColorCircle";

import AsyncStorage from "@react-native-async-storage/async-storage";

import dark from "./dark";
import light from "./light";

import { Theme } from "./theme.interface";

interface ThemeContextData {
  theme: Theme;
  themes: Array<{ title: Theme["title"]; content: React.ReactNode }>;
  colors: Array<{ code: string; content: React.ReactNode }>;
  brand: string;
  toggleTheme: (title: string) => void;
  toggleBrand: (code: string) => void;
  loaded: boolean;
};

interface ThemeProviderProps {
  children: React.ReactNode;
};

export const ThemeContext: React.Context<ThemeContextData> = React.createContext<ThemeContextData>({} as ThemeContextData);

export default function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [ theme, setTheme ] = React.useState<Theme>(dark);
  const [ brand, setBrand ] = React.useState<string>("#1D1D1F");

  const [ loaded, setLoaded ] = React.useState(false);

  const themes: Array<{ title: Theme["title"]; content: React.ReactNode }> = [
    { title: "light", content: <LightModeSvg fill={theme.title === "light" ? brand : theme.colors.icon} /> },
    { title: "dark", content: <DarkModeSvg fill={theme.title === "dark" ? brand : theme.colors.icon} /> },
  ];

  const colors: Array<{ code: string; content: React.ReactNode }> = [
    { code: "#673840", content: <ColorCircle fill="#673840" /> },
    { code: "#FFC0CB", content: <ColorCircle fill="#FFC0CB" /> },
    { code: "#1D1D1F", content: <ColorCircle fill="#1D1D1F" /> },
    { code: "#795548", content: <ColorCircle fill="#795548" /> },
    { code: "#c5a882", content: <ColorCircle fill="#c5a882" /> },
    { code: "#007ae3", content: <ColorCircle fill="#007ae3" /> },
    { code: "#234c6f", content: <ColorCircle fill="#234c6f" /> },
    { code: "#6d5b94", content: <ColorCircle fill="#6d5b94" /> },
    { code: "#8a4b37", content: <ColorCircle fill="#8a4b37" /> },
    { code: "#efe7db", content: <ColorCircle fill="#efe7db" /> },
  ];

  function toggleTheme(title: string): void {
    switch(title) {
      case "light":
        setTheme(light);
        break;
      case "dark":
        setTheme(dark);
        break;
      default:
        break;
    };
  };

  function toggleBrand(code: string): void {
    setBrand(code);
  };

  async function saveThemeChanges(): Promise<void> {
    await AsyncStorage.setItem("@devfinance:theme", JSON.stringify(theme));
  };

  async function saveBrandChanges(): Promise<void> {
    await AsyncStorage.setItem("@devfinance:brand", JSON.stringify(brand));
  };

  React.useEffect(() => {
    if(!loaded) {
      setLoaded(true);
    } else {
      saveThemeChanges();
    }
  }, [ theme ]);

  React.useEffect(() => {
    if(!loaded) {
      setLoaded(true);
    } else {
      saveBrandChanges();
    }
  }, [ brand ]);

  React.useEffect(() => {
    async function setStoredValues(): Promise<void> {
      const storedTheme: string | null = await AsyncStorage.getItem("@devfinance:theme");
      const storedBrand: string | null = await AsyncStorage.getItem("@devfinance:brand");
  
      if(storedTheme) {
        const parsedStoredTheme: Theme = JSON.parse(storedTheme);
        
        setTheme(parsedStoredTheme);
      }
      
      if(storedBrand) {
        const parsedStoredBrand: string = JSON.parse(storedBrand);
        
        setBrand(parsedStoredBrand);
      }
    };

    setStoredValues();
  }, []);

  return(
    <ThemeContext.Provider
      value={{
        theme,
        themes,
        colors,
        brand,
        toggleTheme,
        toggleBrand,
        loaded,
      }}
    >
      { children }
    </ThemeContext.Provider>
  );
};