# Advanced Todo App – Part 3: Deploy to GitHub Pages

Part 3 of the Todo series: the finished Part 2 app, set up for deployment to GitHub Pages.

📺 **Video:** https://youtu.be/84elVi2oCMI
🏠 **All projects:** [Happy Learning HQ – yt-projects](../../README.md)

## What you'll learn
- Setting `base` in `vite.config.js`
- `gh-pages` package with `predeploy` / `deploy` scripts
- Turning on GitHub Pages for your repo

## Run it locally
```bash
git clone https://github.com/arunkaushikdev/yt-projects.git
cd yt-projects/react/todo-app-part-3-deploy-github-pages
npm install
npm run dev
```
Then open http://localhost:5173

## Deploy your own copy
In the video the app lives in its own repo called `advanced-todo-app`. Copy this folder into **your own** repo, then:
1. In `vite.config.js`, set `base: '/<your-repo-name>/'`
2. `npm run deploy`
3. GitHub → Settings → Pages → Branch: `gh-pages`
