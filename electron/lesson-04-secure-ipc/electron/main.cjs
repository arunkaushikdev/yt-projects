const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('node:path');
const fs = require('node:fs/promises');

const isDev = process.argv.includes('--dev');
const dataFile = () => path.join(app.getPath('userData'), 'expenses.json');

// Production only: our own files may run, nothing else
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
].join('; ');

function isValidExpense(e) {
  return (
    typeof e === 'object' &&
    e !== null &&
    Number.isFinite(e.id) &&
    typeof e.title === 'string' &&
    e.title.length <= 100 &&
    Number.isFinite(e.amount) &&
    e.amount > 0 &&
    typeof e.category === 'string' &&
    typeof e.date === 'string'
  );
}

ipcMain.handle('expenses:load', async () => {
  try {
    return JSON.parse(await fs.readFile(dataFile(), 'utf8'));
  } catch {
    return []; // first run: no file yet
  }
});

ipcMain.handle('expenses:save', async (event, expenses) => {
  if (!Array.isArray(expenses) || !expenses.every(isValidExpense)) {
    throw new Error('Invalid expenses data');
  }
  await fs.writeFile(dataFile(), JSON.stringify(expenses, null, 2));
  return true;
});

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 760,
    title: 'Expense Tracker',
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173'); // Vite dev server: hot reload
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html')); // built files
  }
}

app.whenReady().then(() => {
  if (!isDev) {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [CSP],
        },
      });
    });
  }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
