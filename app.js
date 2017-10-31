const electron = require('electron');
const {app, BrowserWindow, ipcMain} = electron;

app.on('ready', () => {

    // MAIN
    let mainWindow = new BrowserWindow({
        width: 965,
        height: 650,
        frame: false
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html')

    // // PREVIEW TRANSFORMATIONS
    // let previewWindow = new BrowserWindow({
    //     width: 965,
    //     height: 650,
    //     frame: false,
    //     show: false
    // });
    // previewWindow.loadURL('file://' + __dirname + '/application/html/showResults.html');
    //
    //
    // ipcMain.on('preview-window-show', (event, arg)=> {
    //     console.log('previewWindow-show');
    //     previewWindow.show();
    // });
    //
    // ipcMain.on('preview-window-hide', (event, arg)=> {
    //     console.log('previewWindow-hide');
    //     previewWindow.hide();
    // });
});