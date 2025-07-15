import { Expense } from "../types";

interface Props {
  expenses: Expense[];
}

const FriendSummary = ({ expenses }: Props) => {
  const summary: Record<string, { paid: number; unpaid: number }> = {};

  expenses.forEach((exp) => {
    exp.friends.forEach((f) => {
      if (!summary[f.name]) summary[f.name] = { paid: 0, unpaid: 0 };
      if (f.paid) summary[f.name].paid += f.share;
      else summary[f.name].unpaid += f.share;
    });
  });

  return (
    <div className="mt-4 p-4 bg-white rounded shadow">
      <h2 className="font-bold mb-2">Friend Summary</h2>
      {Object.entries(summary).map(([name, val]) => (
        <div key={name} className="text-sm mb-1">
          <strong>{name}</strong>: Paid ₹{val.paid}, Owes ₹{val.unpaid}
        </div>
      ))}
    </div>
  );
};

export default FriendSummary;
