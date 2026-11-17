# Character Counter in React

A text area with a live character count, a 100-character limit, a progress bar, and a colour warning (yellow near the limit, red at the limit). Emojis are counted correctly.

📺 **Video:** coming Sun 13 Dec 2026 on [Happy Learning HQ](https://www.youtube.com/@happylearninghq)
🏠 **All projects:** [Happy Learning HQ – yt-projects](../../README.md)

## What you'll learn
- A controlled `<textarea>` (`value` + `onChange`)
- Values calculated from state (`count`, `remaining`) instead of extra state
- Enforcing a limit: only call `setText` when the new value fits
- Dynamic class names and inline styles (``className={`fill ${status}`}``)
- Why `"😀".length` is 2, and why `[...text].length` counts real characters

## Run it locally
```bash
git clone https://github.com/arunkaushikdev/yt-projects.git
cd yt-projects/react/character-counter
npm install
npm run dev
```
Then open http://localhost:5173
