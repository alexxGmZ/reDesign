/**
 * Updates the canvas resolution and the displayed resolution text.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to be updated.
 */
function updateCanvasResolution(canvas) {
   if (!canvas) return;
   console.log(`updateCanvasResolution(${canvas})`);

   const newCanvasWidth = parseInt(document.getElementById("changeResWidth").value);
   const newCanvasHeight = parseInt(document.getElementById("changeResHeight").value);
   let canvasResElement = document.getElementById("displayCanvasResolution");

   canvas.setWidth(newCanvasWidth);
   canvas.setHeight(newCanvasHeight);
   canvasResElement.textContent = `${newCanvasWidth}x${newCanvasHeight}`;
}

module.exports = {
   updateCanvasResolution
}
