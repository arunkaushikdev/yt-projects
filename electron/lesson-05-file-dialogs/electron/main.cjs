const { app, BrowserWindow, ipcMain, session, dialog } = require('electron');
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

// CSV: one line per expense. A title with a comma goes inside quotes.
const cell = (v) => {
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
};

function toCsv(expenses) {
  const rows = expenses.map((e) =>
    [e.id, e.title, e.amount, e.category, e.date].map(cell).join(',')
  );
  return ['id,title,amount,category,date', ...rows].join('\n') + '\n';
}

function parseLine(line) {
  const out = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { out.push(cur); cur = ''; }
    else cur += ch;
  }
  return [...out, cur];
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

ipcMain.handle('expenses:export-csv', async (event, expenses) => {
  if (!Array.isArray(expenses) || !expenses.every(isValidExpense)) {
    throw new Error('Invalid expenses data');
  }
  const win = BrowserWindow.fromWebContents(event.sender);
  const { canceled, filePath } = await dialog.showSaveDialog(win, {
    title: 'Export expenses',
    defaultPath: 'expenses.csv',
    filters: [{ name: 'CSV file', extensions: ['csv'] }],
  });
  if (canceled) return { canceled: true };
  await fs.writeFile(filePath, toCsv(expenses));
  return { canceled: false, filePath, count: expenses.length };
});

ipcMain.handle('expenses:import-csv', async (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  const { canceled, filePaths } = await dialog.showOpenDialog(win, {
    title: 'Import expenses',
    properties: ['openFile'],
    filters: [{ name: 'CSV file', extensions: ['csv'] }],
  });
  if (canceled) return { canceled: true };
  const text = await fs.readFile(filePaths[0], 'utf8');
  const lines = text.split(/\r?\n/).slice(1).filter((l) => l.trim());
  const rows = lines.map((line, i) => {
    const [, title, amount, category, date] = parseLine(line);
    return { id: Date.now() + i, title, amount: Number(amount), category, date };
  });
  const expenses = rows.filter(isValidExpense);
  return { canceled: false, expenses, skipped: rows.length - expenses.length };
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
