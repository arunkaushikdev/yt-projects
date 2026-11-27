import { getIcon } from "../categories.js";
import { formatMoney, formatDate } from "../format.js";

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses yet. Add your first one! 👆</p>;
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id} className="expense-item">
          <span className="expense-icon">{getIcon(expense.category)}</span>
          <div className="expense-info">
            <span className="expense-title">{expense.title}</span>
            <span className="expense-meta">
              {expense.category} · {formatDate(expense.date)}
            </span>
          </div>
          <span className="expense-amount">{formatMoney(expense.amount)}</span>
          <button
            className="delete-btn"
            aria-label={`Delete ${expense.title}`}
            onClick={() => onDelete(expense.id)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;
