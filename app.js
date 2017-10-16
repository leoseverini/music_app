const electron = require('electron')
const {app, BrowserWindow} = electron


app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 965,
        height: 650,
        frame: false
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html')
});