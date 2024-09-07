const fabric = require("fabric").fabric;
var canvas;
const iro = require("@jaames/iro");
const { dialogOpen, dialogClose } = require(__dirname + "/js/modules/dialog");
const {
   generateCanvas,
   generateCanvasArea,
   createCanvasColorPicker,
   importCanvasFromJSON,
} = require(__dirname + "/js/topbar/canvas");
const {
   displayPointerCoordinates
} = require(__dirname + "/js/statusbar/displayPointerCoordinates");
const {
   changeResInitialValues,
   updateCanvasResolution,
} = require(__dirname + "/js/statusbar/canvasResolution");
const {
   initializeZoomButtons,
   zoomIn,
   zoomOut,
   zoomRange
} = require(__dirname + "/js/statusbar/canvasScaler");
const {
   generateRectangle,
   generateCircle,
   generateText,
   generateLine,
} = require(__dirname + "/js/sidebar/object");
const {
   saveCanvasToJSON,
   saveCanvasToJPEG,
   saveCanvasToPNG,
} = require(__dirname + "/js/topbar/exportCanvas");
const { importImage } = require(__dirname + "/js/topbar/importImage");
const {
   copyObjects,
   cutObjects,
   pasteObjects
} = require(__dirname + "/js/topbar/cutCopyPaste");
const { toggleContextMenu } = require(__dirname + "/js/contextMenu/contextMenu");

document.addEventListener("DOMContentLoaded", () => {
   initializeZoomButtons(canvas);
});

//
// keymaps
//
document.addEventListener("keydown", function(event) {
   if (event.ctrlKey) {
      // ctrl + c
      if (event.key.toLowerCase() === "c") {
         event.preventDefault();
         copyObjects(canvas);
      }

      // ctrl + x
      if (event.key.toLowerCase() === "x") {
         event.preventDefault();
         cutObjects(canvas);
      }

      // ctrl + v
      if (event.key.toLowerCase() === "v") {
         event.preventDefault();
         pasteObjects(canvas);
      }

      // ctrl + s
      if (event.key.toLowerCase() === "s") {
         event.preventDefault();
         saveCanvasToJSON(canvas);
      }
   }
});

//
// createCanvasDialog buttons
//
const openCreateCanvasDialogBtn = document.getElementById("openCreateCanvasDialog");
openCreateCanvasDialogBtn.addEventListener("click", () => {
   dialogOpen("createCanvasDialog");
   createCanvasColorPicker(iro);
});

const closeCreateCanvasDialogBtn = document.getElementById("closeCreateCanvasDialog");
closeCreateCanvasDialogBtn.addEventListener("click", () => {
   dialogClose("createCanvasDialog");

   // FIX: fixes the incrementing color picker
   document.getElementById("canvasColorPicker").innerHTML = "";
});

const generateCanvasBtn = document.getElementById("generateCanvas");
generateCanvasBtn.addEventListener("click", () => {
   const { canvasHeight, canvasWidth, canvasBgColor } = generateCanvas();
   canvas = generateCanvasArea(fabric, canvas, canvasHeight, canvasWidth, canvasBgColor);

   dialogClose("createCanvasDialog");
   // FIX: fixes the incrementing color picker
   document.getElementById("canvasColorPicker").innerHTML = "";

   initializeZoomButtons(canvas);
   displayPointerCoordinates(canvas);
   toggleContextMenu(canvas);
});

//
// save and export buttons
//
const saveCanvasBtn = document.getElementById("saveCanvas");
saveCanvasBtn.addEventListener("click", () => {
   saveCanvasToJSON(canvas);
});

const saveCanvasToJPEGBtn = document.getElementById("saveCanvasToJPEG");
saveCanvasToJPEGBtn.addEventListener("click", () => {
   saveCanvasToJPEG(canvas);
});

const saveCanvasToPNGBtn = document.getElementById("saveCanvasToPNG");
saveCanvasToPNGBtn.addEventListener("click", () => {
   saveCanvasToPNG(canvas);
});

//
// import image to canvas button
//
const importImageBtn = document.getElementById("importImage");
importImageBtn.addEventListener("click", () => {
   importImage(fabric, canvas);
});

//
// open canvas from JSON button
//
const importCanvasJSONBtn = document.getElementById("importCanvasFromJSON");
importCanvasJSONBtn.addEventListener("click", async () => {
   const {
      canvasObjects,
      canvasBgColor,
      canvasWidth,
      canvasHeight,
   } = await importCanvasFromJSON();

   canvas = await generateCanvasArea(fabric, canvas, canvasHeight, canvasWidth, canvasBgColor);
   await canvas.loadFromJSON(canvasObjects);
   await canvas.renderAll();
   initializeZoomButtons(canvas);
   await displayPointerCoordinates(canvas);
   await toggleContextMenu(canvas);
});

//
// cut, copy, and paste buttons
//
const copyObjectsBtn = document.getElementById("copyObjects");
copyObjectsBtn.addEventListener("click", () => {
   copyObjects(canvas);
});

const cutObjectsBtn = document.getElementById("cutObjects");
cutObjectsBtn.addEventListener("click", () => {
   cutObjects(canvas);
});

const pasteObjectsBtn = document.getElementById("pasteObjects");
pasteObjectsBtn.addEventListener("click", () => {
   pasteObjects(canvas);
   canvas.requestRenderAll();
});

//
// changeCanvasResDialog buttons
//
const openChangeCanvasResDlgBtn = document.getElementById("openChangeCanvasResDialog");
openChangeCanvasResDlgBtn.addEventListener("click", () => {
   if (!canvas) return;
   dialogOpen("changeCanvasResDialog");
   changeResInitialValues(canvas);
});

const closeChangeCanvasResDlgBtn = document.getElementById("closeChangeResolutionDialog");
closeChangeCanvasResDlgBtn.addEventListener("click", () => {
   dialogClose("changeCanvasResDialog");
});

const changeCanvasResBtn = document.getElementById("changeCanvasResolution");
changeCanvasResBtn.addEventListener("click", () => {
   updateCanvasResolution(canvas);
   dialogClose("changeCanvasResDialog");
});

//
// zoom buttons
//
const scaleDownBtn = document.getElementById("scaleDown");
scaleDownBtn.addEventListener("click", () => {
   zoomOut(canvas);
});
const scaleRangeInput = document.getElementById("scaleRangeInput");
scaleRangeInput.addEventListener("input", () => {
   zoomRange(canvas);
});
const scaleUpBtn = document.getElementById("scaleUp");
scaleUpBtn.addEventListener("click", () => {
   zoomIn(canvas);
});

//
// sidebar buttons
//
const generateRectangleBtn = document.getElementById("generateRectangle");
generateRectangleBtn.addEventListener("click", () => {
   generateRectangle(fabric, canvas);
});

const generateCircleBtn = document.getElementById("generateCircle")
generateCircleBtn.addEventListener("click", () => {
   generateCircle(fabric, canvas);
});

const generateTextBtn = document.getElementById("generateText")
generateTextBtn.addEventListener("click", () => {
   generateText(fabric, canvas);
});

const generateLineBtn = document.getElementById("generateLine")
generateLineBtn.addEventListener("click", () => {
   generateLine(fabric, canvas);
});

