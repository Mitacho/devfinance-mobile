import React from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface TransactionsContextData {
  isLoading: boolean;
  transactions: Array<Transaction>;
  incomes: number;
  expenses: number;
  total: number;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (index: number) => void;
  removeAll: () => void;
};

interface TransactionsProviderProps {
  children: React.ReactNode;
};

export interface Transaction {
  description: string;
  amount: number;
  date: string;
};

export const TransactionsContext: React.Context<TransactionsContextData> = React.createContext({} as TransactionsContextData);

export default function TransactionProvider({ children }: TransactionsProviderProps): JSX.Element {
  const [ transactions, updateTransactions ] = React.useState<Array<Transaction>>([]);

  const [ incomes, updateIncomes ] = React.useState<number>(0);
  const [ expenses, updateExpenses ] = React.useState<number>(0);
  const [ total, updateTotal ] = React.useState<number>(0);

  const [ isLoading, setIsLoading ] = React.useState<boolean>(true);

  function getIncomes(): void {
    let income: number = 0;

    transactions.map((transaction: Transaction) => {
      if(transaction.amount > 0) {
        income += transaction.amount;
      }
    });

    updateIncomes(income);
  };

  function getExpenses(): void {
    let expense: number = 0;

    transactions.map((transaction: Transaction) => {
      if(transaction.amount < 0) {
        expense += transaction.amount;
      }
    });

    updateExpenses(expense);
  };

  function getTotal(): void {
    updateTotal(incomes + expenses);
  };

  function updateValues(): void {
    getIncomes();
    getExpenses();
    getTotal();
  };

  function addTransaction(transaction: Transaction): void {
    const newTransactions: Array<Transaction> = transactions;

    newTransactions.push(transaction);
    
    updateTransactions(newTransactions);
    updateValues();
  };

  function removeTransaction(index: number): void {
    const newTransactions: Array<Transaction> = transactions;

    newTransactions.splice(index, 1);
    
    updateTransactions(newTransactions);
    updateValues();
  };

  function removeAll(): void {
    updateTransactions([]);
  };

  async function save(): Promise<void> {
    setIsLoading(true);

    await AsyncStorage.setItem("@devfinance:transactions", JSON.stringify(transactions));

    setIsLoading(false);
  };

  React.useEffect(() => {
    async function setStoredValues(): Promise<void> {
      const storedValue: string | null = await AsyncStorage.getItem("@devfinance:transactions");

      if(storedValue) {
        const parsedStoredValue: Array<Transaction> = JSON.parse(storedValue);
        
        updateTransactions(parsedStoredValue);
      }
    };
  
    setStoredValues();
    updateValues();

    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    updateValues();
    save();
  }, [transactions, expenses, incomes]);

  return(
    <TransactionsContext.Provider
      value={{
        isLoading,
        transactions,
        incomes,
        expenses,
        total,
        addTransaction,
        removeTransaction,
        removeAll,
      }}
    >
      { children }
    </TransactionsContext.Provider>
  );
};