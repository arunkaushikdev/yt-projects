import { formatMoney } from "../format.js";

function Summary({ total, count }) {
  return (
    <div className="summary">
      <div className="summary-card">
        <span className="summary-label">Total spent</span>
        <strong className="summary-value">{formatMoney(total)}</strong>
      </div>
      <div className="summary-card">
        <span className="summary-label">Expenses</span>
        <strong className="summary-value">{count}</strong>
      </div>
    </div>
  );
}

export default Summary;
