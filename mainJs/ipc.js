const { ipcMain, dialog } = require("electron");
const fs = require("fs");

/**
 * Handles the "save-canvas-data" IPC event, which triggers a save dialog and writes
 * canvas data to a JSON file. The file path is chosen by the user, and a response is sent
 * back to the renderer process with the status of the save operation.
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

module.exports = {
   openCanvasFile
}
