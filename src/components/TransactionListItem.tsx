import React from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";

import RemoveSvg from "../assets/images/svg/Remove";

import { ThemeContext } from "../theme";
import { TransactionsContext } from "../context/Transactions";

import useOrientation from "../hooks/useOrientation";

import { formatCurrency } from "../utils/currency";
import { formatDate } from "../utils/date";

interface Props {
  description: string;
  amount: number;
  date: string;
  index: number;
};

export default function TransactionListItem(props: Props): JSX.Element {
  const { theme } = React.useContext(ThemeContext);
  const { removeTransaction } = React.useContext(TransactionsContext);

  const { window } = useOrientation();

  return(
    <View
      style={[
        styles.item,
        {
          backgroundColor: theme.colors.accent,
        }
      ]}
    >
      <Text
        numberOfLines={1}
        style={[
          styles.itemText,
          {
            color: theme.colors.text
          }
        ]}
      >
        { props.description }
      </Text>
      <Text
        numberOfLines={1}
        style={[
          styles.itemText,
          {
            color: props.amount > 0 ? "#12A454" : "#E83f5b",
          }
        ]}
      >
        { formatCurrency(props.amount) }
      </Text>
      {
        window.width > 470 && (
          <Text
            numberOfLines={1}
            style={[
              styles.itemText,
              {
                color: theme.colors.text
              }
            ]}
          >
            { formatDate(props.date) }
          </Text>
        )
      }
      <TouchableWithoutFeedback
        onPress={() => removeTransaction(props.index)}
      >
        <View>
          <RemoveSvg fill={theme.colors.icon} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 16,
    paddingHorizontal: 32,

    marginBottom: 8,

    borderRadius: 4,
  },

  itemText: {
    flex: 1,
  },
});