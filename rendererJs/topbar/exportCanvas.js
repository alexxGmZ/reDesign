/**
 * Saves the current Fabric.js canvas to a JSON format and sends the data via IPC to the
 * main process for saving. If the canvas is not defined, the function exits early.
 *
 * @param {Electron.IpcRenderer} ipcRenderer - The IPC renderer instance for communication
 * with the main process.
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to be saved.
 */
function saveCanvasToJSON(ipcRenderer, canvas) {
   if (!canvas) return;
   console.log(`saveCanvasToJSON(${ipcRenderer}, ${canvas})`);

   const canvasData = {
      canvasObjects: canvas.toObject(),
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
   };
   const jsonedCanvasData = JSON.stringify(canvasData, null, 2);

   ipcRenderer.send("save-canvas", jsonedCanvasData);
}

/**
 * Exports the current Fabric.js canvas to a JPEG format and sends the data URL via IPC to
 * the main process for saving. If the canvas is not defined, the function exits early.
 *
 * @param {Electron.IpcRenderer} ipcRenderer - The IPC renderer instance for communication
 * with the main process.
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to be saved.
 */
function exportCanvasToJPEG(ipcRenderer, canvas) {
   if (!canvas) return;
   console.log(`exportCanvasToJPEG(${ipcRenderer}, ${canvas})`);
   const dataURL = canvas.toDataURL({ format: "jpeg" });
   ipcRenderer.send("export-canvas-to-jpeg", dataURL);
}

/**
 * Exports the current Fabric.js canvas to a PNG format and sends the data URL via IPC to
 * the main process for saving. If the canvas is not defined, the function exits early.
 *
 * @param {Electron.IpcRenderer} ipcRenderer - The IPC renderer instance for communication
 * with the main process.
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to be exported as a PNG.
 */
function exportCanvasToPNG(ipcRenderer, canvas) {
   if (!canvas) return;
   console.log(`exportCanvasToPNG(${ipcRenderer}, ${canvas})`);
   const dataURL = canvas.toDataURL({ format: "png" });
   ipcRenderer.send("export-canvas-to-png", dataURL);
}

module.exports = {
   saveCanvasToJSON,
   exportCanvasToJPEG,
   exportCanvasToPNG
}
