const { ipcMain, dialog } = require("electron");
const fs = require("fs");

/**
 * Handles the "save-canvas-data" IPC event, which triggers a save dialog and writes
 * canvas data to a JSON file. The file path is chosen by the user, and a response is sent
 * back to the renderer process with the status of the save operation.
 *
 * @returns {Object} The canvas' parsed JSON data or an object stating an error and error
 * message.
 */
function openCanvasFile() {
   console.log("openCanvasFile()");
   const replyChannel = "open-canvas-file-reply";

   ipcMain.on("open-canvas-file", async (event) => {
      try {
         const { canceled, filePaths } = await dialog.showOpenDialog({
            title: "Open Canvas",
            properties: ["openFile"],
            filters: [{ name: "JSON", extensions: ["json"] }]
         });

         if (canceled && filePaths.length == 0) {
            console.log("File selection canceled");
            return event.reply(replyChannel, {
               message: "File selection canceled",
            });
         }

         const filePath = filePaths[0];
         const fileData = await fs.promises.readFile(filePath, "utf-8");
         const jsonData = JSON.parse(fileData);
         return event.reply(replyChannel, jsonData);
      } catch (error) {
         console.error("Failed to read file", error);
         return event.reply(replyChannel, {
            message: "Failed to read file",
            error: error
         });
      }
   });
}

/**
 * Handles the "save-canvas-data" IPC event, which triggers a save dialog and writes
 * canvas data to a JSON file. The file path is chosen by the user, and a response is sent
 * back to the renderer process with the status of the save operation.
 *
 * @returns {Object} The ipcMain message status of saving the canvas or an error.
 */
function saveCanvas() {
   console.log("saveCanvas()");
   const replyChannel = "save-canvas-reply";

   ipcMain.on("save-canvas", async (event, jsonedCanvasData) => {
      try {
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

         await fs.promises.writeFile(filePath, jsonedCanvasData);
         console.log("Canvas saved successfully");
         return event.reply(replyChannel, {
            message: "Canvas saved successfully",
         });
      } catch (error) {
         console.log("Save canvas failed", error);
         return event.reply(replyChannel, {
            message: "Save canvas failed",
            error: error
         });
      }
   });
}

module.exports = {
   openCanvasFile,
   saveCanvas
}
