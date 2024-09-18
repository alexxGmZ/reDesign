const { BrowserWindow, Menu } = require("electron");

/**
 * Menu template object
 */
const menuTemplate = Menu.buildFromTemplate([
   {
      label: "File",
      submenu: [
         {
            label: "Open canvas file",
            click: () => {
               console.log("File > Open canvas file");
               BrowserWindow.getFocusedWindow().webContents.send("open-canvas-file");
            }
         },
         {
            label: "Save canvas",
            click: () => {
               console.log("File > Save canvas");
               // send a signal to renderer
               BrowserWindow.getFocusedWindow().webContents.send("save-canvas");
            }
         },
         {
            label: "Export",
            submenu: [
               {
                  label: "PNG",
                  click: () => {
                     console.log("File > Export > PNG");
                     BrowserWindow.getFocusedWindow().webContents.send("export-canvas-to-png");
                  }
               }
            ]
         },
         { role: "toggleDevTools" },
         { role: "reload" }
      ]
   }
]);

module.exports = {
   menuTemplate
}
