import React from "react";

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";

import DatePicker from "../../components/DatePicker";

import useOrientation from "../../hooks/useOrientation";

import { ThemeContext } from "../../theme";
import { Transaction, TransactionsContext } from "../../context/Transactions";

import { formatAmount } from "../../utils/currency";
import { formatDate } from "../../utils/date";

import { StackParamList } from "../navigator.types";

type Props = {
  navigation: NativeStackNavigationProp<StackParamList, "AddTransaction">;
  route: RouteProp<StackParamList, "AddTransaction">;
};

let formFeedbackTimeout: number;

export default function AddTransactionScreen({ navigation }: Props): JSX.Element {
  const { window } = useOrientation();

  const { theme, brand } = React.useContext(ThemeContext);
  const { addTransaction } = React.useContext(TransactionsContext);

  const [ formFeedback, updateFormFeedback ] = React.useState<string>("");

  const [ date, setDate ] = React.useState<string>("");
  const [ description, updateDescription ] = React.useState<string>("");
  const [ amount, updateAmount ] = React.useState<string>();

  function handleChangeDescription(description: string): void {
    updateDescription(description);
  };

  function handleChangeAmount(amount: string): void {
    updateAmount(amount);
  };

  function updateFormFeedbackMessage(message: string): void {
    updateFormFeedback(message);
      
    formFeedbackTimeout = setTimeout(() => {
      updateFormFeedback("");
    }, 3000);
  };

  function handleFormSubmit(): void {
    if(!date ||
       !description ||
       !amount
    ) {
      updateFormFeedbackMessage("preencha todos os campos");

      return;
    }

    const newTransaction: Transaction = {
      description,
      amount: formatAmount(String(amount)),
      date: formatDate(date)
    };

    addTransaction(newTransaction);

    setDate("");
    updateDescription("");
    updateAmount("");

    updateFormFeedbackMessage("transação adicionada");
  };

  React.useEffect(() => {
    return () => {
      if(formFeedbackTimeout) {
        clearTimeout(formFeedbackTimeout);
      }
    };
  }, []);

  return(
    <ScrollView
      style={{ backgroundColor: theme.colors.background}}
    >
      <View style={[{ height: 16 }]}/>
      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",
            }
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text
              }
            ]}
          >
            Descrição
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.text
              }
            ]}
          >
            descreva essa transação para que você a entenda com clareza
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.text,
      
                backgroundColor: theme.colors.input,
                
                borderColor: theme.colors.inputBorder,
              }
            ]}
            placeholder="exemplo: conta de água"
            placeholderTextColor={theme.colors.placeholder}
            onChangeText={(description: string) => handleChangeDescription(description)}
            value={description}
            keyboardType="default"
          />
        </View>
      </View>

      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",
            }
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text
              }
            ]}
          >
            Valor
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.text
              }
            ]}
          >
            use o sinal - ( negativo ) para despesas e , ( vírgula ) para casas decimais
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: theme.colors.text,
      
                backgroundColor: theme.colors.input,
                
                borderColor: theme.colors.inputBorder,
              }
            ]}
            placeholder="exemplo: -29,45"
            placeholderTextColor={theme.colors.placeholder}
            onChangeText={(amount: string) => handleChangeAmount(amount)}
            value={amount ? String(amount) : ""}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.container}>
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",
            }
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text
              }
            ]}
          >
            Data
          </Text>
          <Text
            style={[
              styles.sectionDescription,
              {
                color: theme.colors.text
              }
            ]}
          >
            introduza a data em que essa transação ocorreu
          </Text>
          <DatePicker value={date} onChangeDate={(date: string) => setDate(date)} />
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
            formFeedback !== "" && (
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: theme.colors.inputBorder,
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
                  { formFeedback }
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

              backgroundColor: "transparent",

              padding: 0,
            }
          ]}
        >
          <TouchableWithoutFeedback
            onPress={handleFormSubmit}
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
                Salvar
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
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",

    marginBottom: 24,
  },

  sectionDescription: {
    marginBottom: 24,
  },

  container: {
    alignItems: "center",
  },

  input: {
    flex: 1,

    height: 42,

    borderWidth: 1,
    borderRadius: 4,

    paddingHorizontal: 8,
  },

  button: {
    flex: 1,

    padding: 16,

    borderRadius: 4,

    alignItems: "center",
    justifyContent: "center",
  },
});