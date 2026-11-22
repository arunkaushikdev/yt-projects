# BMI Calculator in React

Enter your weight (kg) and height (cm) and see your BMI live, with a category (Underweight, Normal, Overweight, Obese) and a colour gauge that shows where you stand. Everything is calculated from two states, no button needed.

📺 **Video:** https://youtu.be/UG95c_rjzgM
🏠 **All projects:** [Happy Learning HQ – yt-projects](../../README.md)

## What you'll learn
- Two controlled `<input type="number">` fields (`value` + `onChange`)
- Why input values are text, and how `Number()` converts them
- Values calculated from state (`bmi`, `category`) instead of extra state
- Guarding against `Infinity` / `NaN` when a field is empty
- Conditional rendering with a ternary (`result` or `hint`)
- Dynamic colours with inline styles, and a CSS-only gauge

## Run it locally
```bash
git clone https://github.com/arunkaushikdev/yt-projects.git
cd yt-projects/react/bmi-calculator
npm install
npm run dev
```
Then open http://localhost:5173
