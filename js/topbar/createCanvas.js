/**
 * Generates the canvas settings based on the current input values.
 *
 * @returns {Object} An object containing the canvas height, width, and background color.
 * @returns {number} return.canvasHeight - The height of the canvas.
 * @returns {number} return.canvasWidth - The width of the canvas.
 * @returns {string} return.canvasBgColor - The background color of the canvas in RGB format.
 */
function generateCanvas() {
   console.log(`generateCanvas()`);

   const red = document.getElementById("rgbR").value;
   const green = document.getElementById("rgbG").value;
   const blue = document.getElementById("rgbB").value;
   const canvasBgColor = `rgb(${red}, ${green}, ${blue})`;

   const canvasHeight = document.getElementById("canvasHeightInput").value.trim() || 0
   const canvasWidth = document.getElementById("canvasWidthInput").value.trim() || 0

   return { canvasHeight, canvasWidth, canvasBgColor }
}

/**
 * Creates and initializes a new canvas element with the given dimensions and background color.
 *
 * @param {Object} fabric - The Fabric.js library.
 * @param {Object} canvas - The canvas object to be used.
 * @param {number} canvasHeight - The height of the canvas.
 * @param {number} canvasWidth - The width of the canvas.
 * @param {string} bgColor - The background color of the canvas in RGB format.
 * @returns {Object} The Fabric.js canvas instance.
 */
function generateCanvasArea(fabric, canvas, canvasHeight, canvasWidth, bgColor) {
   console.log(`generateCanvasArea(${fabric}, ${canvas}, ${canvasHeight}, ${canvasWidth}, ${bgColor})`);

   const canvasElement = document.createElement("canvas");
   canvasElement.id = "canvas";
   canvasElement.className = "border border-2";

   let canvasResElement = document.getElementById("displayCanvasResolution");
   canvasResElement.textContent = `${canvasWidth}x${canvasHeight}`;

   const canvasPlaceholder = document.querySelector("#canvasArea");
   canvasPlaceholder.innerHTML = "";
   canvasPlaceholder.appendChild(canvasElement);

   canvas = new fabric.Canvas("canvas", {
      fireRightClick: true,
      preserveObjectStacking: true,
      height: canvasHeight,
      width: canvasWidth
   });
   canvas.set('backgroundColor', bgColor).requestRenderAll();

   return canvas;
}

/**
 * Initializes a color picker for selecting and updating canvas colors, and synchronizes
 * it with RGB input fields.
 *
 * @param {Object} iro - The Iro.js library object used to create the color picker.
 */
function createCanvasColorPicker(iro) {
   console.log(`createCanvasColorPicker(${iro})`);

   var colorPicker = new iro.ColorPicker("#canvasColorPicker", {
      // Set the size of the color picker
      width: 250,
      color: "rgb(255, 255, 255)",
      layoutDirection: "horizontal",
      borderWidth: 2,
      borderColor: "#000000"
   });

   var red, green, blue;

   // initial color picker values
   colorPicker.on("color:init", (color) => {
      // Convert the initial color to RGB
      red = color.rgb.r;
      green = color.rgb.g;
      blue = color.rgb.b;
      document.getElementById("rgbR").value = red;
      document.getElementById("rgbG").value = green;
      document.getElementById("rgbB").value = blue;
   });

   // when the color picker is used
   colorPicker.on("color:change", (color) => {
      // Convert the initial color to RGB
      red = color.rgb.r;
      green = color.rgb.g;
      blue = color.rgb.b;
      document.getElementById("rgbR").value = red;
      document.getElementById("rgbG").value = green;
      document.getElementById("rgbB").value = blue;
   });

   function updateColorPicker() {
      console.log("updateColorPicker()");
      var newColor = `rgb(${red}, ${green}, ${blue})`;
      colorPicker.color.set(newColor);
   }

   // update the color picker when the input box is used
   document.getElementById("rgbR").addEventListener("input", function() {
      red = this.value;
      updateColorPicker();
   });
   document.getElementById("rgbG").addEventListener("input", function() {
      green = this.value;
      updateColorPicker();
   });
   document.getElementById("rgbB").addEventListener("input", function() {
      blue = this.value;
      updateColorPicker();
   });
}

module.exports = {
   generateCanvas,
   generateCanvasArea,
   createCanvasColorPicker
}
