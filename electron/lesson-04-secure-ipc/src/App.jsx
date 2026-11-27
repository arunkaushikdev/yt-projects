import { useState, useEffect } from "react";
import Summary from "./components/Summary.jsx";
import Filters from "./components/Filters.jsx";
import CategoryChart from "./components/CategoryChart.jsx";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import { loadExpenses, saveExpenses } from "./storage.js";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [month, setMonth] = useState("all");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    loadExpenses().then((saved) => {
      setExpenses(saved);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveExpenses(expenses);
  }, [expenses, loaded]);

  const addExpense = (expense) => {
    setExpenses([expense, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const months = [...new Set(expenses.map((e) => e.date.slice(0, 7)))]
    .sort()
    .reverse();

  const inMonth = expenses.filter(
    (e) => month === "all" || e.date.startsWith(month)
  );
  const visible = inMonth.filter(
    (e) => category === "All" || e.category === category
  );

  const total = visible.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="app">
      <div className="tracker">
        <h1>Expense Tracker</h1>
        <p className="subtitle">Know where your money goes.</p>

        <div className="layout">
          <div className="column">
            <Summary total={total} count={visible.length} />
            <ExpenseForm onAdd={addExpense} />
            <CategoryChart expenses={inMonth} />
          </div>

          <div className="column">
            <Filters
              months={months}
              month={month}
              onMonthChange={setMonth}
              category={category}
              onCategoryChange={setCategory}
            />
            <ExpenseList expenses={visible} onDelete={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
