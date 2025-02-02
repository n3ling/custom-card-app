const { contextBridge, ipcRenderer } = require("electron");
//window.ipcRenderer = require("electron").ipcRenderer;

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: ipcRenderer.send,
  on: ipcRenderer.on,
});
