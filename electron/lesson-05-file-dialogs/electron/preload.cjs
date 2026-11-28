const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('expensesApi', {
  load: () => ipcRenderer.invoke('expenses:load'),
  save: (expenses) => ipcRenderer.invoke('expenses:save', expenses),
  exportCsv: (expenses) => ipcRenderer.invoke('expenses:export-csv', expenses),
  importCsv: () => ipcRenderer.invoke('expenses:import-csv'),
});
