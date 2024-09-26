const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
const fs = require("fs");
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
