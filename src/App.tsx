import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FriendSummary from "./components/FriendSummary";
import { Expense, FriendShare } from "./types";

import "./App.css";

const LOCAL_STORAGE_KEY = "spending-tracker-data";

const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(expenses));
};

const loadExpenses = (): Expense[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

function App() {
  const [allExpenses, setAllExpenses] = useState<Expense[]>(loadExpenses);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    saveExpenses(allExpenses);
  }, [allExpenses]);

  const handleAddExpense = (expense: Expense) => {
    setAllExpenses([...allExpenses, expense]);
  };

  const togglePaid = (expenseId: string, friendName: string) => {
    const updated = allExpenses.map((e) => {
      if (e.id === expenseId) {
        return {
          ...e,
          friends: e.friends.map((f) =>
            f.name === friendName ? { ...f, paid: !f.paid } : f
          ),
        };
      }
      return e;
    });
    setAllExpenses(updated);
  };

  const deleteExpense = (expenseId: string) => {
    const updated = allExpenses.filter((e) => e.id !== expenseId);
    setAllExpenses(updated);
  };

  const clearHistory = () => {
    setAllExpenses([]);
    saveExpenses([]);
  };

  const friendSummary = (): Record<string, FriendShare> => {
    const summary: Record<string, FriendShare> = {};
    allExpenses.forEach((exp) => {
      exp.friends.forEach((f) => {
        if (!summary[f.name]) {
          summary[f.name] = { paid: 0, owe: 0 };
        }
        if (f.paid) summary[f.name].paid += f.share;
        else summary[f.name].owe += f.share;
      });
    });
    return summary;
  };

  return (
    <div className="min-h-screen bg-pink-50 font-sans flex flex-col">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 bg-pink-500 text-white px-3 py-2 rounded shadow"
        onClick={() => setShowHistory((prev) => !prev)}
      >
        {showHistory ? "Close History" : "Open History"}
      </button>

      <div className="max-w-screen-xl mx-auto lg:flex flex-1 w-full">
        {/* Sidebar */}
        <aside
          className={`bg-pink-100 p-4 shadow-md w-full lg:w-64 overflow-y-auto max-h-screen z-10 transition-transform duration-300 fixed lg:static top-0 h-full lg:translate-x-0 ${
            showHistory ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-xl font-bold text-pink-700 mb-2 flex items-center gap-2">
            📖 Expense History
          </h2>
          <button
            onClick={clearHistory}
            className="text-sm text-red-500 hover:underline mb-3"
          >
            🩹 Clear History
          </button>
          <ul className="space-y-2">
            {allExpenses.map((exp) => (
              <li
                key={exp.id}
                className="bg-white p-2 rounded shadow text-sm"
              >
                <div className="font-semibold">{exp.title}</div>
                <div>₹{exp.amount}</div>
                <div className="text-xs text-gray-500">{exp.date}</div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold text-center mb-6 text-pink-700 flex items-center justify-center gap-3">
            <img src="/logo.jpeg" alt="Logo" className="w-20 h-20 rounded-full" />
            Daily Spending Tracker
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded p-4 shadow">
              <ExpenseForm onAdd={handleAddExpense} />
            </div>

            <div className="bg-white rounded p-4 shadow">
              <ExpenseList
                expenses={allExpenses}
                onTogglePaid={togglePaid}
                onDelete={deleteExpense}
              />
            </div>

            <div className="bg-white rounded p-4 shadow">
              <FriendSummary expenses={allExpenses} />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-pink-700 text-white py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm mt-6">
        <div>© 2025 KALPITHA S V</div>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a
            href="https://github.com/kalpithasv"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <i className="fab fa-github text-xl hover:text-gray-300"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/kalpitha-sv-582759252/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin text-xl hover:text-gray-300"></i>
          </a>
          <a
            href="https://www.instagram.com/kalpitha_sv"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <i className="fab fa-instagram text-xl hover:text-gray-300"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
