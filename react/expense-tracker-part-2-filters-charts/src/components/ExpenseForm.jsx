import { useState } from "react";
import { CATEGORIES } from "../categories.js";

function ExpenseForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toLocaleDateString("sv-SE"));
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || Number(amount) <= 0) {
      setError("Enter a title and an amount above 0");
      return;
    }

    onAdd({
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      category,
      date,
    });

    setTitle("");
    setAmount("");
    setError("");
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        className="title-input"
        type="text"
        placeholder="What did you spend on?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="form-row">
        <input
          className="amount-input"
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.icon} {c.name}
            </option>
          ))}
        </select>
        <input
          className="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && <p className="form-error">⚠️ {error}</p>}

      <button className="add-btn" type="submit">
        Add expense
      </button>
    </form>
  );
}

export default ExpenseForm;
