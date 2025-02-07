/**
 * This file contains functions for handling ipcMain requests
 */

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

/**
 * Handles the "export-canvas-to-png" IPC event, which triggers a save dialog and exports
 * canvas data to a PNG file. The canvas data is provided as a Data URL and is converted
 * to binary format before saving.
 *
 * @returns {Object} The ipcMain message status of exporting a canvas to PNG or an error.
 */
function exportCanvasToPng() {
   console.log("exportCanvasToPng()");
   const replyChannel = "export-canvas-to-png-reply";

   ipcMain.on("export-canvas-to-png", async (event, canvasDataURL) => {
      try {
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
         await fs.promises.writeFile(filePath, binaryData);

         console.log("Canvas exported to PNG successfully");
         return event.reply(replyChannel, {
            message: "Canvas exported to PNG successfully",
         });
      } catch (error) {
         console.log("Export canvas to PNG failed", error);
         return event.reply(replyChannel, {
            message: "Export canvas to PNG failed",
            error: error
         });
      }
   });
}

/**
 * Handles the "export-canvas-to-jpeg" IPC event, which triggers a save dialog and exports
 * canvas data to a JPEG file. The canvas data is provided as a Data URL and is converted
 * to binary format before saving.
 *
 * @returns {Object} The ipcMain message status of exporting a canvas to JPEG or an error.
 */
function exportCanvasToJpeg() {
   console.log("exportCanvasToJpeg()");
   const replyChannel = "export-canvas-to-jpeg-reply";

   ipcMain.on("export-canvas-to-jpeg", async (event, canvasDataURL) => {
      try {
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
         await fs.promises.writeFile(filePath, binaryData);

         console.log("Canvas exported to JPEG successfully");
         return event.reply(replyChannel, {
            message: "Canvas exported to JPEG successfully",
         });
      } catch (error) {
         console.log("Export canvas to JPEG failed", error);
         return event.reply(replyChannel, {
            message: "Export canvas to JPEG failed",
            error: error
         });
      }
   });
}

/**
 * Handles the IPC event to import an image into the canvas. Opens a file dialog
 * for the user to select an image, converts the selected image to a Base64 data URL,
 * and replies with the data URL or an error message through the specified reply channel.
 *
 * @returns {Object} The ipcMain message status of importing image to a canvas or an error.
 */
function importImageToCanvas() {
   console.log("importImageToCanvas()");
   const replyChannel = "import-image-to-canvas-reply";

   ipcMain.on("import-image-to-canvas", async (event) => {
      try {
         const { canceled, filePaths } = await dialog.showOpenDialog({
            title: "Select Image",
            properties: ["openFile"],
            filters: [{ name: "Image", extensions: ["jpeg", "png"] }]
         });

         if (canceled && filePaths.length == 0) {
            console.log("Image selection canceled");
            return event.reply(replyChannel, {
               message: "Image selection canceled",
            });
         }

         const filePath = filePaths[0];
         const fileBuffer = fs.readFileSync(filePath);
         const fileExtension = filePath.split(".").pop();
         const base64Data = fileBuffer.toString("base64");
         const dataURL = `data:image/${fileExtension};base64,${base64Data}`;

         return event.reply(replyChannel, dataURL);
      } catch (error) {
         console.log("Import image to canvas failed", error);
         return event.reply(replyChannel, {
            message: "Import image to canvas failed",
            error: error
         });
      }
   })
}

module.exports = {
   openCanvasFile,
   saveCanvas,
   exportCanvasToPng,
   exportCanvasToJpeg,
   importImageToCanvas
}
