const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const fs = require("fs");
const { menuTemplate } = require("./mainJs/menuTemplate.js");

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
      console.log("file selection canceled");
      return event.reply("open-canvas-file-reply", {
         message: "File selection canceled",
      });
   }

   const filePath = filePaths[0];

   fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
         console.error("Failed to read file:", err);
         return event.reply("open-canvas-file-reply", {
            message: "Failed to read file",
            error: err
         });
      }

      try {
         const jsonData = JSON.parse(data);
         return event.reply("open-canvas-file-reply", jsonData);
      } catch (error) {
         console.error("Failed to parse JSON:", error);
         return event.reply("open-canvas-file-reply", {
            message: "Invalid JSON file",
            error: error,
         });
      }
   });
});

/**
 * Handles the "save-canvas-data" IPC event, which triggers a save dialog and writes
 * canvas data to a JSON file. The file path is chosen by the user, and a response is sent
 * back to the renderer process with the status of the save operation.
 */
ipcMain.on("save-canvas", async (event, jsonedCanvasData) => {
   console.log("ipcMain.on('save-canvas-data')");

   const { filePath } = await dialog.showSaveDialog({
      title: "Save Canvas",
      defaultPath: "untitled.json",
      filters: [{ name: "JSON", extensions: ["json"] }]
   });

   if (!filePath) {
      console.log("Save canvas canceled");
      return event.reply("save-canvas-reply", {
         message: "Save canvas canceled",
      });
   }

   fs.writeFile(filePath, jsonedCanvasData, (error) => {
      if (error) {
         console.log("Save canvas failed", error);
         return event.reply("save-canvas-reply", {
            message: "Save canvas failed",
            error: error
         });
      }

      console.log("Canvas saved successfully");
      return event.reply("save-canvas-reply", {
         message: "Canvas saved successfully",
      });
   });
});
