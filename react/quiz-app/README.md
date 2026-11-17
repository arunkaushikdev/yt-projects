# Quiz App in React

A 5-question quiz with a 10-second timer per question, green/red answers, a score, and a results screen with "Play again". Deployed for free on Vercel.

📺 **Video:** https://youtu.be/JRbIGh4BW-A · Short: https://youtube.com/shorts/K2dMHQWaDoY
🏠 **All projects:** [Happy Learning HQ – yt-projects](../../README.md)

## What you'll learn
- Keeping data in its own file (`questions.js`) and rendering it with `map`
- State for the current question, the selected answer and the score
- Values calculated from state (`isAnswered`, `timeUp`, `finished`)
- A guard clause (`if (isAnswered) return`) to stop double answers
- A timer with `useEffect` + `setInterval`, and why it needs a cleanup (`return () => clearInterval(id)`)
- Deploying with the Vercel CLI

## Run it locally
```bash
git clone https://github.com/arunkaushikdev/yt-projects.git
cd yt-projects/react/quiz-app
npm install
npm run dev
```
Then open http://localhost:5173

## Deploy on Vercel
```bash
npm install -g vercel
vercel login
vercel --prod
```
