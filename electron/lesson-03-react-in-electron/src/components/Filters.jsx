import { CATEGORIES } from "../categories.js";
import { formatMonth } from "../format.js";

function Filters({ months, month, onMonthChange, category, onCategoryChange }) {
  return (
    <div className="filters">
      <select
        className="month-select"
        value={month}
        onChange={(e) => onMonthChange(e.target.value)}
      >
        <option value="all">All months</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {formatMonth(m)}
          </option>
        ))}
      </select>

      <div className="chips">
        {["All", ...CATEGORIES.map((c) => c.name)].map((name) => (
          <button
            key={name}
            className={category === name ? "chip active" : "chip"}
            onClick={() => onCategoryChange(name)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
