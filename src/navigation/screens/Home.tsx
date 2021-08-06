import React from "react";

import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Card from "../../components/Card";
import SettingsButton from "../../components/SettingsButton";
import TransactionListItem from "../../components/TransactionListItem";

import useOrientation from "../../hooks/useOrientation";

import IncomeSvg from "../../assets/images/svg/Income";
import ExpenseSvg from "../../assets/images/svg/Expense";
import BalanceSvg from "../../assets/images/svg/Balance";

import { ThemeContext } from "../../theme";
import { Transaction, TransactionsContext } from "../../context/Transactions";

import { StackParamList } from "../navigator.types";

interface Props {
  navigation: NativeStackNavigationProp<StackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props): JSX.Element {
  const { theme, brand } = React.useContext(ThemeContext);
  const {
    incomes,
    expenses,
    total,
    isLoading,
    transactions
  } = React.useContext(TransactionsContext);

  const { window } = useOrientation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SettingsButton navigation={navigation} />
      ),
    });
  }, [navigation]);

  return(
    <ScrollView
      contentContainerStyle={[ { backgroundColor: theme.colors.background } ]}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={[
        styles.header,
        { backgroundColor: brand }
      ]}>
      </View>
      <View style={styles.container}>
        <View
          style={[
            styles.balance,
            {
              flexDirection: window.width >= 800 ? "row" : "column",
              justifyContent: window.width >= 800 ? "space-between" : "flex-start"
            }
          ]}
        >
          <Card
            type="Entradas"
            amount={incomes}
            icon={isLoading ? <ActivityIndicator size="large" color={brand} /> : <IncomeSvg fill="#12A454" />}
            navigation={navigation}
            navigateTo="AddTransaction"
          />
          <Card
            type="Saídas"
            amount={expenses}
            icon={isLoading ? <ActivityIndicator size="large" color={brand} /> : <ExpenseSvg fill="#E83f5b" />}
            navigation={navigation}
            navigateTo="AddTransaction"
          />
          <Card
            type="Total"
            amount={total}
            highlight={true}
            icon={isLoading ? <ActivityIndicator size="large" color={brand} /> : <BalanceSvg fill={theme.colors.icon} />}
            navigation={navigation}
            navigateTo="AddTransaction"
          />
        </View>
      </View>

      <View
        style={styles.container}
      >
        <View
          style={[
            styles.section,
            {
              width: window.width > 800 ? 550 : "90%",
            }
          ]}
        >
          {
            transactions.length > 0 && (
              <View
                style={[{
                  marginVertical: 32,
                }]}
              >
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.colors.text
                    }
                  ]}
                >
                  Transações
                </Text>
              </View>
            )
          }
          <View>
            {
              transactions.map(({ description, amount, date }: Transaction, index: number) => {
                return(
                  <TransactionListItem
                    key={index}
                    description={description}
                    amount={amount}
                    date={date}
                    index={index}
                  />
                );
              })
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  header: {
    alignItems: "center",

    paddingTop: 32,
    paddingBottom: 160,
  },

  balance: {
    width: "100%",
    maxWidth: 800,

    alignItems: "center",

    marginTop: -128,
  },

  section: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",

    marginBottom: 24,
  },
});