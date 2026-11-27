# Electron Lesson 1: Your First Desktop App

Free lesson 1 of the **Desktop Apps with Electron** course by [Happy Learning HQ](https://www.youtube.com/@happylearninghq).
Video: https://youtu.be/EV9_kVOTyJ4 (premieres Thu 1 Jan 2027)

## Run it
```bash
cd electron/lesson-01-first-window
npm install
npm start
```
You need [Node.js](https://nodejs.org). Built and tested with Electron 45.5.0.

## Files
- `package.json`: `"main": "main.js"` and the `start` script
- `main.js`: the main process (creates the window, handles the app lifecycle)
- `index.html`: the page shown inside the window

## Challenge
Change the window width, height and title in `main.js`, and put your own name in `index.html`.
