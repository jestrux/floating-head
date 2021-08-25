const path = require('path');
const { menubar } = require('menubar');
const { ipcMain } = require("electron");

const mb = menubar({
  icon: path.join(__dirname, 'icon.png'),
  browserWindow: {
    frame: false,
    width: 200, height: 200,
    transparent:true,
    alwaysOnTop: true,
    contextIsolation: true,
    enableRemoteModule: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js") 
    }
  }
});

mb.on('ready', () => {
  console.log('app is ready');
});

ipcMain.on('close', () => mb.window.close());

// mb.on('after-create-window', () => mb.window.openDevTools())