const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const isDev = process.argv.includes('--dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 760,
    title: 'Expense Tracker',
  });

  if (isDev) {
    win.loadURL('http://localhost:5173'); // Vite dev server: hot reload
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html')); // built files
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
