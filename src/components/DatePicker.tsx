import React from "react";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";

import { ThemeContext } from "../theme";

interface Props {
  onChangeDate: (date: string) => void;
  value: string;
};

export default function DatePicker({ onChangeDate, value }: Props): JSX.Element {
  const { theme } = React.useContext(ThemeContext);

  const [ feedback, updateFeedback ] = React.useState<string>("");

  function isValidDate(dateString: string): boolean {
    if(!/^(0?[1-9]|[12][0-9]|3[01])[\/\-\.](0?[1-9]|1[012])[\/\-\.]\d{4}$/.test(dateString)) {
      return false;
    } else {
      return true;
    }
  };

  function handleChange(date: string): void {
    const length: number = date.length;
    
    onChangeDate(date);

    if(length === 10) {
      if(isValidDate(date)) {
        updateFeedback("");
      } else {
        updateFeedback("Data inválida");
        onChangeDate("");
      }
    }
  };

  return(
    <View>
      <View>
        <Text
          style={[
            {
              color: theme.colors.feedback,

              marginBottom: 16
            }
          ]}
        >
          {feedback}
        </Text>
      </View>
      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.text,
  
            backgroundColor: theme.colors.input,
            
            borderColor: theme.colors.inputBorder,
          }
        ]}
        placeholder="data de exemplo: 05.08.2021"
        placeholderTextColor={theme.colors.placeholder}
        onChangeText={(date: string) => handleChange(date)}
        value={value}
        maxLength={10}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,

    height: 42,

    borderWidth: 1,
    borderRadius: 4,

    paddingHorizontal: 8,
  },
});