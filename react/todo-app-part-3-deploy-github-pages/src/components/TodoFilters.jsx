const FILTERS = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

function TodoFilters({ filter, onChange, counts }) {
  return (
    <div className="todo-filters">
      {FILTERS.map((f) => (
        <button
          key={f.value}
          type="button"
          className={`filter-btn ${filter === f.value ? "active" : ""}`}
          onClick={() => onChange(f.value)}
        >
          {f.label} ({counts[f.value]})
        </button>
      ))}
    </div>
  );
}

export default TodoFilters;
