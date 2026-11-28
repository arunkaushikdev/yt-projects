import { CATEGORIES } from "../categories.js";
import { formatMoney } from "../format.js";

function CategoryChart({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  if (total === 0) return null;

  const rows = CATEGORIES.map((c) => ({
    ...c,
    amount: expenses
      .filter((e) => e.category === c.name)
      .reduce((sum, e) => sum + e.amount, 0),
  }))
    .filter((row) => row.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="chart">
      <h2>Where your money goes</h2>
      {rows.map((row) => (
        <div key={row.name} className="chart-row">
          <span className="chart-label">
            {row.icon} {row.name}
          </span>
          <div className="chart-track">
            <div
              className="chart-bar"
              style={{ width: `${(row.amount / total) * 100}%` }}
            />
          </div>
          <span className="chart-amount">{formatMoney(row.amount)}</span>
        </div>
      ))}
    </div>
  );
}

export default CategoryChart;
