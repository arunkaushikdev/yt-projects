# Electron Lesson 4: Secure IPC (save data to a real file)

Free lesson 4 of the **Desktop Apps with Electron** course by [Happy Learning HQ](https://www.youtube.com/@happylearninghq).
Video: https://youtu.be/HkQWwfTKQC0 (premieres Wed 7 Jan 2027)

## Run it
```bash
cd electron/lesson-04-secure-ipc
npm install
npm run electron:dev   # development (Vite hot reload)
npm start              # production build
```
Your expenses are saved to `expenses.json` in Electron's `userData` folder (on Windows: `%APPDATA%/expense-tracker-desktop`).

## Key ideas
- `ipcMain.handle` in `electron/main.cjs` does the file work and **validates every request**
- `electron/preload.cjs` exposes only two functions, `load` and `save`, with `contextBridge`
- Production Content Security Policy, set in `main.cjs`
- Never turn on `nodeIntegration` just to read or write files

## Challenge
Add a "Clear all" button with its own IPC call, and validate the request in main.
