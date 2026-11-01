// Exposed only in the desktop app; the browser version has no window.butcherDesktop.
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('butcherDesktop', {
  version: ipcRenderer.sendSync('version'),
  checkUpdate: () => ipcRenderer.invoke('check-update'),
});
