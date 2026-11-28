# Electron Lesson 5: File dialogs (Export and Import CSV)

Bonus lesson 5 of the **Desktop Apps with Electron** course by [Happy Learning HQ](https://www.youtube.com/@happylearninghq).
Video: https://youtu.be/258NJKHehfs

## Run it
```bash
cd electron/lesson-05-file-dialogs
npm install
npm run electron:dev   # development (Vite hot reload)
npm start              # production build
```

## Key ideas
- `dialog.showSaveDialog` and `dialog.showOpenDialog` live in the **main process** and open real native dialogs
- The user chooses the path; the page never passes one. Always handle `canceled: true`
- Pass the window (`BrowserWindow.fromWebContents(event.sender)`) so the dialog belongs to it
- CSV: quote values that contain commas; a file is input too, so validate every imported row

## Challenge
Add an "Export JSON backup" button: a Save dialog with a `.json` filter, and validate the data in main first.
