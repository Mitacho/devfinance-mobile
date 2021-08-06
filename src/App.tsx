import React from "react";

import {
  StatusBar,
  SafeAreaView,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./navigation/screens/Home";
import SettingsScreen from "./navigation/screens/Settings";
import AddTransactionScreen from "./navigation/screens/AddTransaction";

import { StackParamList } from "./navigation/navigator.types";

import { ThemeContext } from "./theme";

const Stack = createNativeStackNavigator<StackParamList>();

export default function App(): JSX.Element {
  const { theme, loaded } = React.useContext(ThemeContext);

  if(!loaded) {
    return(
      <SafeAreaView
        style={{
          flex: 1,

          backgroundColor: theme.colors.background,
        }}
      />
    );
  } else {
    return(
      <SafeAreaView
        style={{
          flex: 1,

          backgroundColor: theme.colors.background,
        }}
      >
        <NavigationContainer>
            <StatusBar
              barStyle={theme.colors.statusContent}
              backgroundColor={theme.colors.statusBar}
            />
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.colors.headerStyle,
                },
                headerTintColor: theme.colors.headerTintColor,
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: "DevFinance",
                }}
              />
              <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  title: "Configurações"
                }}
              />
              <Stack.Screen
                name="AddTransaction"
                component={AddTransactionScreen}
                options={{
                  title: "Adicionar transação"
                }}
              />
            </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
};