import { useState } from "react";
import { Expense } from "../types";
import { v4 as uuid } from "uuid";

interface Props {
  onAdd: (expense: Expense) => void;
}

const ExpenseForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [friendNames, setFriendNames] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const friendList = friendNames.split(",").map((name) => name.trim());
    const share = parseFloat((amount / friendList.length).toFixed(2));

    const friends = friendList.map((name) => ({
      name,
      share,
      paid: false,
    }));

    const newExpense: Expense = {
      id: uuid(),
      title,
      amount,
      category: "Food",
      date,
      friends,
    };

    onAdd(newExpense);

    // Reset form
    setTitle("");
    setAmount(0);
    setFriendNames("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Add Expense</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border p-2 mb-2 w-full"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        required
      />
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Friends (comma-separated)"
        value={friendNames}
        onChange={(e) => setFriendNames(e.target.value)}
        required
      />
      <input
        className="border p-2 mb-2 w-full"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button className="bg-pink-400 text-white px-4 py-2 rounded w-full">Add</button>
    </form>
  );
};

export default ExpenseForm;
