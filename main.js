const { app, BrowserWindow, Menu } = require("electron");
const { menuTemplate } = require("./mainJs/menuTemplate.js");
const ipc = require("./mainJs/ipc.js");

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

   Menu.setApplicationMenu(menuTemplate);
   win.loadFile("./index.html");
}

app.whenReady().then(() => {
   createWindow();
});

ipc.openCanvasFile();
ipc.saveCanvas();
ipc.exportCanvasToPng();
ipc.exportCanvasToJpeg();
ipc.importImageToCanvas();
