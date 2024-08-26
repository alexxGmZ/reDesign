console.log(__dirname)

const fabric = require("fabric");
let canvas;
const iro = require("@jaames/iro");
const { dialogOpen, dialogClose } = require(__dirname + "/js/modules/dialog");

const openCreateCanvasDialogBtn = document.getElementById("openCreateCanvasDialog");
openCreateCanvasDialogBtn.addEventListener("click", () => {
   dialogOpen("createCanvasDialog");
   createCanvasColorPicker();
});

const closeCreateCanvasDialogBtn = document.getElementById("closeCreateCanvasDialog");
closeCreateCanvasDialogBtn.addEventListener("click", () => {
   dialogClose("createCanvasDialog");
});

const generateCanvasBtn = document.getElementById("generateCanvas");
generateCanvasBtn.addEventListener("click", () => {
   generateCanvas();
   dialogClose("createCanvasDialog");
});

function generateCanvas() {
   console.log("generateCanvas()");

   const red = document.getElementById("rgbR").value;
   const green = document.getElementById("rgbG").value;
   const blue = document.getElementById("rgbB").value;
   const canvasBgColor = `rgb(${red}, ${green}, ${blue})`;

   const canvasHeight = document.getElementById("canvasHeightInput").value.trim() || 0
   const canvasWidth = document.getElementById("canvasWidthInput").value.trim() || 0

   generateCanvasArea(canvasHeight, canvasWidth, canvasBgColor);
}

function generateCanvasArea(canvasHeight, canvasWidth, bgColor) {
   console.log(`generateCanvasArea(${canvasHeight}, ${canvasWidth}, ${bgColor})`);

   const canvasElement = document.createElement("canvas");
   canvasElement.id = "canvas";
   canvasElement.className = "border border-2";

   const canvasPlaceholder = document.querySelector("#canvasArea");
   canvasPlaceholder.innerHTML = "";
   canvasPlaceholder.appendChild(canvasElement);

   canvas = new fabric.Canvas("canvas", {
      backgroundColor: bgColor,
      fireRightClick: true,
      preserveObjectStacking: true,
      height: canvasHeight,
      width: canvasWidth
   });
}

/**
 * Initializes a color picker using the iro.js library, allowing users to pick a color
 * and synchronize it with RGB input fields. The color picker updates when the input
 * fields are modified.
 */
function createCanvasColorPicker() {
   console.log("createCanvasColorPicker()");

   var color_picker = new iro.ColorPicker("#canvasColorPicker", {
      // Set the size of the color picker
      width: 250,
      color: "rgb(255, 255, 255)",
      layoutDirection: "horizontal",
      borderWidth: 2,
      borderColor: "#000000"
   });

   var red, green, blue;

   // initial color picker values
   color_picker.on('color:init', (color) => {
      // Convert the initial color to RGB
      red = color.rgb.r;
      green = color.rgb.g;
      blue = color.rgb.b;
      document.getElementById("rgbR").value = red;
      document.getElementById("rgbG").value = green;
      document.getElementById("rgbB").value = blue;
   });

   // when the color picker is used
   color_picker.on('color:change', (color) => {
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
      color_picker.color.set(newColor);
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
   canvas
}
