const path = require('path');
const { menubar } = require('menubar');
const { ipcMain } = require("electron");

const mb = menubar({
  icon: path.join(__dirname, "assets", 'icon.png'),
  browserWindow: {
    frame: false,
    width: 200, height: 200,
    transparent:true,
    alwaysOnTop: true,
    contextIsolation: true,
    enableRemoteModule: false,
    webPreferences: {
      preload: path.join(__dirname, "assets", "preload.js") 
    }
  }
});

mb.on('ready', () => {
  console.log('app is ready');
});

ipcMain.on('close', () => mb.window.hide());

mb.on('show', () => {
  mb.window.webContents.send("startVideo");
});

// mb.on('after-create-window', () => mb.window.openDevTools())