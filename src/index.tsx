import React from "react";

import App from "./App";

import TransactionProvider from "./context/Transactions";
import ThemeProvider from "./theme";

export default function Index(): JSX.Element {
  return (
    <ThemeProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </ThemeProvider>
  );
};