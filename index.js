import "react-native-gesture-handler";

import { AppRegistry } from "react-native";

import { name as appName } from "./app.json";

import Index from "./src/index";

AppRegistry.registerComponent(appName, () => Index);