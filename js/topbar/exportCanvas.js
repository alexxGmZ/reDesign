/**
 * Saves the current state of the Fabric.js canvas as a JSON file.
 *
 * @param {Object} canvas - The Fabric.js canvas instance to be saved.
 */
function saveCanvasToJSON(canvas) {
   if (!canvas) return;
   console.log(`saveCanvasToJSON(${canvas})`);

   const canvasData = {
      canvasObjects: canvas.toObject(),
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
   };
   const jsonedCanvasData = JSON.stringify(canvasData, null, 2);
   const blob = new Blob([jsonedCanvasData], { type: "application/json" });
   const url = URL.createObjectURL(blob);
   const anchorElement = document.createElement("a");

   anchorElement.href = url;
   anchorElement.download = "untitled.json";
   anchorElement.click();
   URL.revokeObjectURL(url);
}

module.exports = {
   saveCanvasToJSON
}