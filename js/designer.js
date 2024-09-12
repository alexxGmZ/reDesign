// This is the designer.js file. Most buttons or DOM elements needing event listeners
// should be placed here.
//
// WARN: All CommonJS "require" statements should be placed here, not in other JavaScript
// (*.js) files. Including them in other files is difficult to manage in the Electron
// Renderer process. Electron's IPC can be used, but it adds complexity, especially for
// developers new to Electron.
//
// It's highly recommended to keep the code modular and reusable.
//
// - Al

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
const {
   getPointerCoordinates,
   mouseContextMenu,
   hideContextMenu
} = require(__dirname + "/js/contextMenu/contextMenu");
const { adjustObjectLayer } = require(__dirname + "/js/contextMenu/objectLayer");
const {
   toggleObjectPropertiesWindow,
} = require(__dirname + "/js/contextMenu/objectProperties");

document.addEventListener("DOMContentLoaded", () => {
   initializeZoomButtons(canvas);
});

// hide context menu on click event buttons
document.addEventListener("click", () => {
   hideContextMenu();
});

//
// keymaps
//
document.addEventListener("keydown", function(event) {
   if (event.ctrlKey) {
      // ctrl + c
      if (event.key.toLowerCase() === "c") {
         event.preventDefault();
         hideContextMenu();
         copyObjects(canvas);
      }

      // ctrl + x
      if (event.key.toLowerCase() === "x") {
         event.preventDefault();
         hideContextMenu();
         cutObjects(canvas);
      }

      // ctrl + v
      if (event.key.toLowerCase() === "v") {
         event.preventDefault();
         hideContextMenu();
         pasteObjects(canvas);
      }

      // ctrl + s
      if (event.key.toLowerCase() === "s") {
         event.preventDefault();
         hideContextMenu();
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
   mouseContextMenu(canvas);
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
   await mouseContextMenu(canvas);
});

//
// cut, copy, and paste buttons
//
const copyObjectsBtn = document.getElementById("copyObjects");
copyObjectsBtn.addEventListener("click", () => {
   hideContextMenu();
   copyObjects(canvas);
});

const cutObjectsBtn = document.getElementById("cutObjects");
cutObjectsBtn.addEventListener("click", () => {
   hideContextMenu();
   cutObjects(canvas);
});

const pasteObjectsBtn = document.getElementById("pasteObjects");
pasteObjectsBtn.addEventListener("click", () => {
   hideContextMenu();
   pasteObjects(canvas);
});

//
// changeCanvasResDialog buttons
//
const openChangeCanvasResDlgBtn = document.getElementById("openChangeCanvasResDialog");
openChangeCanvasResDlgBtn.addEventListener("click", () => {
   if (!canvas) return;
   hideContextMenu();
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

const generateCircleBtn = document.getElementById("generateCircle");
generateCircleBtn.addEventListener("click", () => {
   generateCircle(fabric, canvas);
});

const generateTextBtn = document.getElementById("generateText");
generateTextBtn.addEventListener("click", () => {
   generateText(fabric, canvas);
});

const generateLineBtn = document.getElementById("generateLine");
generateLineBtn.addEventListener("click", () => {
   generateLine(fabric, canvas);
});

//
// context menu
//
const contextMenuCopyBtn = document.getElementById("contextMenuCopyBtn");
contextMenuCopyBtn.addEventListener("click", () => {
   copyObjects(canvas);
});

const contextMenuCutBtn = document.getElementById("contextMenuCutBtn");
contextMenuCutBtn.addEventListener("click", () => {
   cutObjects(canvas);
});

const contextMenuPasteBtn = document.getElementById("contextMenuPasteBtn");
contextMenuPasteBtn.addEventListener("click", () => {
   const { pointerX, pointerY } = getPointerCoordinates();
   pasteObjects(canvas, pointerX, pointerY);
});

const layerBringToFrontBtn = document.getElementById("layerBringToFrontBtn");
layerBringToFrontBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "bringToFront");
});

const layerBringForwardBtn = document.getElementById("layerBringForwardBtn");
layerBringForwardBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "bringForward");
});

const layerSendBackwardBtn = document.getElementById("layerSendBackwardBtn");
layerSendBackwardBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "sendBackward");
});

const layerSendToBackBtn = document.getElementById("layerSendToBackBtn");
layerSendToBackBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "sendToBack");
});

const objectPropertiesBtn = document.getElementById("objectPropertiesBtn");
objectPropertiesBtn.addEventListener("click", () => {
   const { pointerX, pointerY } = getPointerCoordinates();
   toggleObjectPropertiesWindow(canvas, "show", pointerX, pointerY);
});

//
// object properties window
//
const objectPropertiesHeaderCloseBtn = document.getElementById("objectPropertiesHeaderCloseBtn");
objectPropertiesHeaderCloseBtn.addEventListener("click", () => {
   toggleObjectPropertiesWindow(canvas, "hide");
});

const objectPropertiesCloseBtn = document.getElementById("objectPropertiesCloseBtn");
objectPropertiesCloseBtn.addEventListener("click", () => {
   toggleObjectPropertiesWindow(canvas, "hide");
});
