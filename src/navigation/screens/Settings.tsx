import React from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import SettingsSelect from "../../components/SettingsSelect";

import useOrientation from "../../hooks/useOrientation";

import { ThemeContext } from "../../theme";
import { TransactionsContext } from "../../context/Transactions";

import { StackParamList } from "../navigator.types";

interface Props {
  navigation: NativeStackNavigationProp<StackParamList, "Home">;
};

let removeAllFeedbackTimeout: number;

export default function SettingsScreen({ navigation }: Props): JSX.Element {
  const {
    theme,
    themes,
    colors,
    brand,
    toggleTheme,
    toggleBrand,
  } = React.useContext(ThemeContext);

  const { removeAll } = React.useContext(TransactionsContext);

  const { window } = useOrientation();

  const [ removeAllFeedback, updateRemoveAllFeedback ] = React.useState<string>("");

  React.useEffect(() => {
    return () => {
      if(removeAllFeedbackTimeout) {
        clearTimeout(removeAllFeedbackTimeout);
      }
    }
  }, []);

  return(
    <ScrollView
      nestedScrollEnabled={true}
      style={[
        {
          backgroundColor: theme.colors.background,
        }
      ]}
    >
      <View style={[{ height: 16 }]}/>
      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",

              backgroundColor: theme.colors.accent,
            }
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              }
            ]}
          >
            Tema
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.text,
              }
            ]}
          >
            escolha um tema que lhe agrade
          </Text>
          <View
            style={styles.sectionOptions}
          >
            {
              themes.map((themeOption, index) => {
                return(
                  <SettingsSelect
                    key={index}
                    onPress={() => toggleTheme(themeOption.title)}
                    children={themeOption.content}
                    isSelected={theme.title === themeOption.title}
                  />
                );
              })
            }
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",

              backgroundColor: theme.colors.accent,
            }
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              }
            ]}
          >
            Cor
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.text,
              }
            ]}
          >
            escolha uma cor e deixe o aplicativo mais bonito aos teus olhos
          </Text>
          <View
            style={styles.sectionOptions}
          >
            {
              colors.map((colorOption, index) => {
                return(
                  <SettingsSelect
                    key={index}
                    onPress={() => toggleBrand(colorOption.code)}
                    children={colorOption.content}
                    isSelected={brand === colorOption.code}
                  />
                );
              })
            }
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",

              backgroundColor: "transparent",

              padding: 0,
            }
          ]}
        >
          {
            removeAllFeedback !== "" && (
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: theme.colors.accentHighlight,
                  }
                ]}
              >
                <Text
                  style={[
                    {
                      color: theme.colors.text
                    }
                  ]}
                >
                  { removeAllFeedback }
                </Text>
              </View>
            )
          }
        </View>
      </View>

      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",

              backgroundColor: theme.colors.accent,
            }
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text,
              }
            ]}
          >
            Limpar transações
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.text,
              }
            ]}
          >
            Isso vai apagar todas as transações
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              removeAll();
              
              updateRemoveAllFeedback("todas as transações foram removidas");
      
              removeAllFeedbackTimeout = setTimeout(() => {
                updateRemoveAllFeedback("");
              }, 3000);
            }}
          >
            <View
              style={[
                styles.button,
                {
                  backgroundColor: brand,
                }
              ]}
            >
              <Text
                style={[
                  {
                    color: (brand === "#FFC0CB" || brand === "#efe7db" || brand === "#c5a882")
                      ? (theme.title === "light") ? "#f0f0f0" : "#121212"
                      : (theme.title === "light") ? "#f0f0f0" : theme.colors.text,
                    
                    fontWeight: "bold",
                  }
                ]}
              >
                Apagar tudo
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    padding: 16,
    marginBottom: 16,

    borderRadius: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",

    marginBottom: 24,
  },

  sectionDescription: {
    marginBottom: 24,
  },

  sectionOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  container: {
    alignItems: "center",
  },

  button: {
    flex: 1,

    padding: 16,

    borderRadius: 4,

    alignItems: "center",
    justifyContent: "center",
  },
});