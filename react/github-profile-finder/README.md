# GitHub Profile Finder in React (search as you type, no API key)

Type a GitHub username and see the avatar, bio, repos, followers and the 5 latest repositories. Search runs automatically after you stop typing (debounce), and it handles "User not found" and rate-limit errors. Uses the free GitHub REST API – no API key needed.

📺 **Video:** https://youtu.be/AVmPIftD8Uk
🏠 **All projects:** [Happy Learning HQ – yt-projects](../../README.md)

## What you'll learn
- Debounce with a custom hook (`useDebounce`)
- `useEffect` cleanup + `AbortController` to cancel old requests
- `Promise.all` for two requests at once
- Handling 404 and rate-limit (403/429) errors
- Auto-deploy with GitHub Actions

## Run it locally
```bash
git clone https://github.com/arunkaushikdev/yt-projects.git
cd yt-projects/react/github-profile-finder
npm install
npm run dev
```
Then open http://localhost:5173

> GitHub allows 60 unauthenticated requests per hour per IP. If you see "Rate limit reached", wait a bit.

## Auto-deploy with GitHub Actions
The workflow is in `.github/workflows/deploy.yml`. To use it in your own repository:
1. Put this project in its own GitHub repo (the workflow file must be at the root of the repo, under `.github/workflows/`).
2. In `vite.config.js`, add `base: '/your-repo-name/'`.
3. On GitHub: Settings → Pages → Source: **GitHub Actions**.
4. Push to `main`. Your site updates itself on every push.
