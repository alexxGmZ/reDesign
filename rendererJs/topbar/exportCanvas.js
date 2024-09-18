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
 * Saves the current state of the Fabric.js canvas as a JPEG file.
 *
 * @param {Object} canvas - The Fabric.js canvas instance to be saved.
 */
function saveCanvasToJPEG(canvas) {
   if (!canvas) return;
   console.log(`saveCanvasToJPEG(${canvas})`);

   const dataURL = canvas.toDataURL({ format: "jpeg" });
   const anchorElement = document.createElement("a");

   anchorElement.href = dataURL;
   anchorElement.download = "untitled.jpeg";
   anchorElement.click();
}

/**
 * Saves the current state of the Fabric.js canvas as a PNG file.
 *
 * @param {Object} canvas - The Fabric.js canvas instance to be saved.
 */
function saveCanvasToPNG(canvas) {
   if (!canvas) return;
   console.log(`saveCanvasToPNG(${canvas})`);

   const dataURL = canvas.toDataURL({ format: "png" });
   const anchorElement = document.createElement("a");

   anchorElement.href = dataURL;
   anchorElement.download = "untitled.png";
   anchorElement.click();
}

module.exports = {
   saveCanvasToJSON,
   saveCanvasToJPEG,
   saveCanvasToPNG,
}
