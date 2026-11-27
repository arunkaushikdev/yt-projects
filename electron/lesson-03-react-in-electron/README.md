# Electron Lesson 3: React + Vite inside Electron

Free lesson 3 of the **Desktop Apps with Electron** course by [Happy Learning HQ](https://www.youtube.com/@happylearninghq).
Video: https://youtu.be/_Klt7HQGMgs (premieres Mon 5 Jan 2027)

## Run it
```bash
cd electron/lesson-03-react-in-electron
npm install
npm run electron:dev   # development: Vite dev server + hot reload
npm start              # production: vite build, then open dist/ in Electron
```
Built and tested with Electron 45.5.0, Vite 8, React 19.

## Key ideas
- Dev mode: `win.loadURL('http://localhost:5173')`
- Production: `win.loadFile('dist/index.html')`
- `base: './'` in `vite.config.js`, otherwise the built app shows a white screen

## Challenge
Change the window size and title, run both modes, and edit a heading to watch hot reload.
