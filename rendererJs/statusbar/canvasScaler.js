const scaleDownBtn = document.getElementById("scaleDown");
const scaleRangeInput = document.getElementById("scaleRangeInput");
const scaleUpBtn = document.getElementById("scaleUp");
const scaleMultiplierText = document.getElementById("scaleMultiplierText");

let rangeMax;
let rangeMin;
let rangeStep;

// WARN: the values of these two variables should only be updated via the
// initializeZoomButtons() or else the canvas will scale undesirably.
let canvasWidth;
let canvasHeight;

/**
 * Initializes zoom buttons and keyboard shortcuts for scaling the Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to be initialized
 * for zoom controls.
 */
function initializeZoomButtons(canvas) {
   console.log(`initializeZoomButtons(${canvas})`);
   if (!canvas) {
      scaleDownBtn.disabled = true;
      scaleRangeInput.disabled = true;
      scaleUpBtn.disabled = true;
      return;
   }

   scaleDownBtn.disabled = false;
   scaleRangeInput.disabled = false;
   scaleUpBtn.disabled = false;

   scaleRangeInput.value = 1;
   scaleMultiplierText.textContent = scaleRangeInput.value + "x";

   canvasWidth = canvas.getWidth();
   canvasHeight = canvas.getHeight();

   rangeMax = parseFloat(scaleRangeInput.max);
   rangeMin = parseFloat(scaleRangeInput.min);
   rangeStep = parseFloat(scaleRangeInput.step);

   document.addEventListener("keydown", (event) => {
      if (event.ctrlKey) {
         // Zoom in with Ctrl + "+"
         if (event.key === "+" || event.key === "=") {
            event.preventDefault();
            zoomIn(canvas);
         }

         // Zoom out with Ctrl + "-"
         if (event.key === "-") {
            event.preventDefault();
            zoomOut(canvas);
         }
      }
   });
}

/**
 * Zooms in the Fabric.js canvas by increasing the scale value.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to zoom in.
 */
function zoomIn(canvas) {
   // stop if rangeMax is reached
   if (parseFloat(scaleRangeInput.value) >= rangeMax) return;

   console.log(`zoomIn(${canvas})`);

   scaleRangeInput.value = parseFloat(scaleRangeInput.value) + rangeStep;
   scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
   updateCanvasSize(canvas);
}

/**
 * Zooms out the Fabric.js canvas by decreasing the scale value.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to zoom out.
 */
function zoomOut(canvas) {
   // stop if rangeMin is reached
   if (parseFloat(scaleRangeInput.value) <= rangeMin) return;

   console.log(`zoomOut(${canvas})`);

   scaleRangeInput.value = parseFloat(scaleRangeInput.value) - rangeStep;
   scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
   updateCanvasSize(canvas);
}

/**
 * Adjusts the Fabric.js canvas size according to the value of the scale range input.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to scale.
 */
function zoomRange(canvas) {
   console.log(`zoomRange(${canvas})`);
   scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
   updateCanvasSize(canvas);
}

/**
 * Updates the Fabric.js canvas size and zoom level based on the current scale range input.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to update.
 */
function updateCanvasSize(canvas) {
   console.log(`updateCanvasSize(${canvas})`);
   canvas.setWidth(canvasWidth * parseFloat(scaleRangeInput.value));
   canvas.setHeight(canvasHeight * parseFloat(scaleRangeInput.value));
   canvas.setZoom(parseFloat(scaleRangeInput.value));
}

/**
 * Resets the Fabric.js canvas zoom level to 1 (default) and updates the corresponding
 * UI elements such as the scale range input and multiplier text. If the canvas is not
 * defined, the function exits early.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance whose zoom level is to be
 * reset.
 */
function resetCanvasZoom(canvas) {
   if (!canvas) return;
   console.log(`resetCanvasZoom(${canvas})`);
   const scaleRangeInput = document.getElementById("scaleRangeInput");
   const scaleMultiplierText = document.getElementById("scaleMultiplierText");

   scaleRangeInput.value = 1;
   scaleMultiplierText.textContent = "1x";
   canvas.setWidth(canvasWidth);
   canvas.setHeight(canvasHeight);
   canvas.setZoom(1);
}

/**
 * Retrieves the current resolution (width and height) of the Fabric.js canvas. If the
 * canvas is not defined, the function exits early and returns default values of 0 for
 * width and height.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance from which to get the
 * resolution.
 * @returns {{ width: number, height: number }} An object containing the width and height
 * of the canvas, defaulting to 0 if the canvas is not defined.
 */
function getCanvasResolution(canvas) {
   if (!canvas) return;
   const width = canvasWidth || 0;
   const height = canvasHeight || 0;
   return {
      width: width,
      height: height
   }
}

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
   canvas.setZoom(1);
   canvasResElement.textContent = `${newCanvasWidth}x${newCanvasHeight}`;
}

module.exports = {
   initializeZoomButtons,
   zoomIn,
   zoomOut,
   zoomRange,
   resetCanvasZoom,
   getCanvasResolution,
   updateCanvasResolution
}
