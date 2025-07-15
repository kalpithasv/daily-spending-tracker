export type Friend = {
  name: string;
  share: number;
  paid: boolean;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string; // 📅 date is string (e.g. "2025-07-15")
  friends: Friend[];
};

