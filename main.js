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
      title: "Open Canvas",
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

   const replyChannel = "save-canvas-reply";
   const { filePath } = await dialog.showSaveDialog({
      title: "Save Canvas",
      defaultPath: "untitled.json",
      filters: [{ name: "JSON", extensions: ["json"] }]
   });

   if (!filePath) {
      console.log("Save canvas canceled");
      return event.reply(replyChannel, {
         message: "Save canvas canceled",
      });
   }

   fs.writeFile(filePath, jsonedCanvasData, (error) => {
      if (error) {
         console.log("Save canvas failed", error);
         return event.reply(replyChannel, {
            message: "Save canvas failed",
            error: error
         });
      }

      console.log("Canvas saved successfully");
      return event.reply(replyChannel, {
         message: "Canvas saved successfully",
      });
   });
});

/**
 * Handles the "export-canvas-to-png" IPC event, which triggers a save dialog and exports
 * canvas data to a PNG file. The canvas data is provided as a Data URL and is converted
 * to binary format before saving.
 */
ipcMain.on("export-canvas-to-png", async (event, canvasDataURL) => {
   console.log("ipcMain.on('export-canvas-to-png')");

   const replyChannel = "export-canvas-to-png-reply";
   const { filePath } = await dialog.showSaveDialog({
      title: "Export canvas to PNG",
      defaultPath: "untitled.png",
      filters: [{ name: "PNG", extensions: ["png"] }]
   });

   if (!filePath) {
      console.log("Export canvas to PNG canceled");
      return event.reply(replyChannel, {
         message: "Export canvas to PNG canceled",
      });
   }

   const base64Data = canvasDataURL.replace(/^data:image\/png;base64,/, "");
   const binaryData = Buffer.from(base64Data, "base64");

   fs.writeFile(filePath, binaryData, (error) => {
      if (error) {
         console.log("Export canvas to PNG failed", error);
         return event.reply(replyChannel, {
            message: "Export canvas to PNG failed",
            error: error
         });
      }

      console.log("Canvas exported to PNG successfully");
      return event.reply(replyChannel, {
         message: "Canvas exported to PNG successfully",
      });
   });
});

/**
 * Handles the "export-canvas-to-jpeg" IPC event, which triggers a save dialog and exports
 * canvas data to a JPEG file. The canvas data is provided as a Data URL and is converted
 * to binary format before saving.
 */
ipcMain.on("export-canvas-to-jpeg", async (event, canvasDataURL) => {
   console.log("ipcMain.on('export-canvas-to-jpeg')");

   const replyChannel = "export-canvas-to-jpeg-reply";
   const { filePath } = await dialog.showSaveDialog({
      title: "Export canvas to JPEG",
      defaultPath: "untitled.jpeg",
      filters: [{ name: "JPEG", extensions: ["jpeg"] }]
   });

   if (!filePath) {
      console.log("Export canvas to JPEG canceled");
      return event.reply(replyChannel, {
         message: "Export canvas to JPEG canceled",
      });
   }

   const base64Data = canvasDataURL.replace(/^data:image\/jpeg;base64,/, "");
   const binaryData = Buffer.from(base64Data, "base64");

   fs.writeFile(filePath, binaryData, (error) => {
      if (error) {
         console.log("Export canvas to JPEG failed", error);
         return event.reply(replyChannel, {
            message: "Export canvas to JPEG failed",
            error: error
         });
      }

      console.log("Canvas exported to JPEG successfully");
      return event.reply(replyChannel, {
         message: "Canvas exported to JPEG successfully",
      });
   });
});
