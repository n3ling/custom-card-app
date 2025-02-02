const { contextBridge, ipcRenderer } = require("electron");
//window.ipcRenderer = require("electron").ipcRenderer;

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: ipcRenderer.send,
  invoke: ipcRenderer.invoke,
  on: ipcRenderer.on,
});
