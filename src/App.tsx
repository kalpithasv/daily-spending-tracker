// src/App.tsx
import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FriendSummary from "./components/FriendSummary";
import { Expense } from "./types";
import { saveExpenses, loadExpenses } from "./utils/storage";

function App() {
  const [allExpenses, setAllExpenses] = useState<Expense[]>([]);
  const [activeExpenses, setActiveExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const saved = loadExpenses();
    setAllExpenses(saved);
    setActiveExpenses(saved);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveExpenses(allExpenses);
    }
  }, [allExpenses, isLoading]);

  const addExpense = (expense: Expense) => {
    setAllExpenses((prev) => [...prev, expense]);
    setActiveExpenses((prev) => [...prev, expense]);
  };
  const clearHistory = () => {
  setAllExpenses([]);
  saveExpenses([]); // clear localStorage
};

  const togglePaid = (expenseId: string, friendName: string) => {
    const updateFn = (list: Expense[]) =>
      list.map((exp) =>
        exp.id === expenseId
          ? {
              ...exp,
              friends: exp.friends.map((f) =>
                f.name === friendName ? { ...f, paid: !f.paid } : f
              ),
            }
          : exp
      );

    setActiveExpenses((prev) => updateFn(prev));
    setAllExpenses((prev) => updateFn(prev));
  };

  const deleteExpense = (expenseId: string) => {
    setActiveExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
  };

  if (isLoading) return <div className="p-4">Loading your data...</div>;

  return (
  <div className="min-h-screen bg-pink-50 lg:flex">
    {/* Sidebar for history */}
    <aside
      className={`bg-pink-100 p-4 shadow-md w-full lg:w-64 overflow-y-auto max-h-screen z-10 transition-transform duration-300 fixed lg:static top-0 h-full ${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <h2 className="font-bold text-pink-700 text-xl mb-3 text-center">
        📖 Expense History
      </h2>
      <button
        className="text-red-500 mb-4 "
        onClick={clearHistory}
      >
      🧹 Clear History
      </button>
      <ul className="space-y-2">
        {allExpenses.map((exp) => (
          <li key={exp.id} className="text-sm bg-white p-2 rounded shadow">
            <div className="font-semibold">{exp.title}</div>
            <div>₹{exp.amount}</div>
            <div className="text-xs text-gray-500">{exp.date}</div>
          </li>
        ))}
      </ul>
    </aside>

    {/* Mobile Toggle Button */}
    <button
      className="lg:hidden fixed top-4 left-4 z-20 bg-pink-500 text-white px-3 py-2 rounded shadow"
      onClick={() => setShowSidebar((prev) => !prev)}
    >
      {showSidebar ? "Close History" : "Open History"}
    </button>

    {/* Main content */}
    <main className="flex-1 p-4 mt-16 lg:mt-0">
      <h1 className="text-2xl font-bold text-center mb-6 text-pink-700">
        💸 Daily Spending Tracker
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <ExpenseForm onAdd={addExpense} />
        </div>

        <div>
          <ExpenseList
            expenses={activeExpenses}
            onTogglePaid={togglePaid}
            onDelete={deleteExpense}
          />
        </div>

        <div>
          <FriendSummary expenses={activeExpenses} />
        </div>
      </div>
    </main>
  </div>
);
}

export default App;
