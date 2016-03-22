const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
var client = require('electron-connect').client;

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
        mainWindow = new BrowserWindow({width: 300, height: 150});
        mainWindow.setMaximizable(false);
        mainWindow.setMenu(null);
        mainWindow.loadURL('file://' + __dirname + '/index.html');
        mainWindow.setResizable(false);    
        // Open the DevTools.
        // mainWindow.webContents.openDevTools();
    
        mainWindow.on('closed', function() {
       mainWindow = null;
    });

    // Connect to server process
    var devel = false;
    if (devel == true) client.create(mainWindow); 
});
