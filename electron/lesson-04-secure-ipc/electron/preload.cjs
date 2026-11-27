const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('expensesApi', {
  load: () => ipcRenderer.invoke('expenses:load'),
  save: (expenses) => ipcRenderer.invoke('expenses:save', expenses),
});
