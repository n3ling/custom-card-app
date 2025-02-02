const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL("http://localhost:3000"); // URL of your React app
}

ipcMain.on("save-data", (event, data) => {
  const filePath = path.join(app.getPath("userData"), "data.json");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
});

ipcMain.on("confirm-quit", () => {
  const response = dialog.showMessageBoxSync(mainWindow, {
    type: "question",
    buttons: ["Yes", "No"],
    title: "Confirm",
    message: "Are you sure you want to quit?",
  });

  if (response === 0) {
    // If 'Yes' is clicked
    app.quit();
  }
});

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
