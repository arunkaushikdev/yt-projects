# Electron Lesson 2: Main, Renderer and Preload

Free lesson 2 of the **Desktop Apps with Electron** course by [Happy Learning HQ](https://www.youtube.com/@happylearninghq).
Video: https://youtu.be/C_1b8AW54oc (premieres Sat 3 Jan 2027)

## Run it
```bash
cd electron/lesson-02-architecture
npm install
npm start
```
Built and tested with Electron 45.5.0.

## Files
- `main.js`: main process, creates the window and loads the preload script
- `preload.js`: exposes `window.versions` safely with `contextBridge`
- `index.html` + `renderer.js`: the page (renderer process)

## Challenge
Add one more value to the bridge, show it on the page, and check that `typeof require` is still `undefined`.
