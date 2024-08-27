/**
 * Sets the initial values of the change resolution input fields based on the current
 * canvas resolution displayed.
 */
function changeResInitialValues() {
   console.log("changeResInitialValues()");

   const canvasRes = document.getElementById("displayCanvasResolution").textContent;
   const [canvasWidth, canvasHeight] = canvasRes.split("x").map(Number);

   // initial values for the change resolution input boxes
   document.getElementById("changeResWidth").value = canvasWidth;
   document.getElementById("changeResHeight").value = canvasHeight;
}

/**
 * Updates the canvas resolution and the displayed resolution text.
 *
 * @param {Object} canvas - The Fabric.js canvas instance to be updated.
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
   changeResInitialValues,
   updateCanvasResolution
}
