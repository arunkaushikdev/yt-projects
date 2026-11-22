import { useState } from "react";
import "./App.css";

function getCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", color: "#0ea5e9" };
  if (bmi < 25) return { label: "Normal", color: "#22c55e" };
  if (bmi < 30) return { label: "Overweight", color: "#f59e0b" };
  return { label: "Obese", color: "#ef4444" };
}

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const reset = () => {
    setWeight("");
    setHeight("");
  };

  const kg = Number(weight);
  const meters = Number(height) / 100;
  const isValid = kg > 0 && meters > 0;

  const bmi = isValid ? kg / (meters * meters) : null;
  const category = bmi ? getCategory(bmi) : null;
  const position = bmi ? ((Math.min(Math.max(bmi, 10), 40) - 10) / 30) * 100 : 0;

  return (
    <div className="app">
      <div className="card">
        <h1>BMI Calculator</h1>
        <p className="subtitle">Check your Body Mass Index.</p>

        <label className="field">
          Weight (kg)
          <input
            className="weight-input"
            type="number"
            placeholder="e.g. 68"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        <label className="field">
          Height (cm)
          <input
            className="height-input"
            type="number"
            placeholder="e.g. 172"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        {category ? (
          <div className="result" style={{ borderColor: category.color }}>
            <span className="result-label">Your BMI</span>
            <strong className="result-value" style={{ color: category.color }}>
              {bmi.toFixed(1)}
            </strong>
            <span className="result-category" style={{ background: category.color }}>
              {category.label}
            </span>
            <div className="gauge">
              <div className="gauge-bar" />
              <div className="gauge-marker" style={{ left: `${position}%` }} />
            </div>
          </div>
        ) : (
          <p className="hint">Enter your weight and height to see your BMI.</p>
        )}

        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
