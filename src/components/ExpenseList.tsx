import { Expense } from "../types";

interface Props {
  expenses: Expense[];
  onTogglePaid: (expenseId: string, friendName: string) => void;
  onDelete: (expenseId: string) => void;
}

const ExpenseList = ({ expenses, onTogglePaid, onDelete }: Props) => {
  return (
    <div className="mt-4">
      {expenses.map((exp) => {
        const allPaid = exp.friends.every((f) => f.paid);

        return (
          <div key={exp.id} className="bg-white p-4 rounded shadow mb-3">
            <div className="flex justify-between items-center mb-1">
              <div className="font-bold">
                {exp.title} - ₹{exp.amount}
              </div>
              {allPaid && (
                <button
                  onClick={() => onDelete(exp.id)}
                  className="text-red-500 text-sm underline"
                >
                  🗑️ Delete
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">{exp.date}</div>
            <ul className="mt-2">
              {exp.friends.map((f) => (
                <li key={f.name} className="flex items-center justify-between">
                  <span>{f.name} owes ₹{f.share}</span>
                  <button
                    onClick={() => onTogglePaid(exp.id, f.name)}
                    className={`px-2 py-1 rounded text-white text-xs ${
                      f.paid ? "bg-green-400" : "bg-red-400"
                    }`}
                  >
                    {f.paid ? "Paid" : "Pending"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;
