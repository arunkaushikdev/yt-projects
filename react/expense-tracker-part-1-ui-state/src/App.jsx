import { useState } from "react";
import Summary from "./components/Summary.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app">
      <div className="tracker">
        <h1>Expense Tracker</h1>
        <p className="subtitle">Know where your money goes.</p>

        <Summary total={total} count={expenses.length} />
        <ExpenseForm onAdd={addExpense} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
}

export default App;
