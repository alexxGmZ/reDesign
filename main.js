const { app, BrowserWindow } = require('electron');

const createWindow = () => {
   const win = new BrowserWindow({
      width: 1280,
      height: 720,
      webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true,
      }
   });

   win.loadFile('./public/designer.html');
}

app.whenReady().then(() => {
   createWindow();
});
