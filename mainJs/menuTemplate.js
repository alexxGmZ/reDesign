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
               console.log("Open canvas file");
               BrowserWindow.getFocusedWindow().webContents.send("open-canvas-file");
            }
         },
         { role: "toggleDevTools" },
         { role: "reload" }
      ]
   }
]);

module.exports = {
   menuTemplate
}
