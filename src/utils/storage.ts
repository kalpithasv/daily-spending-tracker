import { Expense } from "types";

const STORAGE_KEY = "expenses";

export const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = (): Expense[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
