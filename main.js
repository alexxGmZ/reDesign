const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const fs = require("fs");

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
   const menu = Menu.buildFromTemplate([
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

   Menu.setApplicationMenu(menu);
   win.loadFile('./index.html');
}

app.whenReady().then(() => {
   createWindow();
});

/**
 * Handles the IPC `open-canvas-file` event to open a JSON file and read its contents.
 * Opens a dialog for the user to select a JSON file, reads the file content, and parses
 * it as JSON. Sends a reply to the renderer process with either the parsed JSON data or
 * an error message if the file cannot be read or parsed.
 */
ipcMain.on("open-canvas-file", async (event) => {
   console.log("ipcMain.on('open-canvas-file')");
   // show dialog for JSON files
   const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "JSON", extensions: ["json"] }]
   });

   if (canceled && filePaths.length == 0) {
      return event.reply("open-canvas-file-reply", {
         error: "File selection canceled",
      });
   }

   const filePath = filePaths[0];

   fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
         console.error("Failed to read file:", err);
         return event.reply("open-canvas-file-reply", {
            error: "Failed to read file",
         });
      }

      try {
         const jsonData = JSON.parse(data);
         return event.reply("open-canvas-file-reply", jsonData);
      } catch (error) {
         console.error("Failed to parse JSON:", error);
         return event.reply("open-canvas-file-reply", {
            error: "Invalid JSON file",
         });
      }
   });
});
