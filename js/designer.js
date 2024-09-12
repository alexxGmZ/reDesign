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
   toggleContextMenu
} = require(__dirname + "/js/contextMenu/contextMenu");
const { adjustObjectLayer } = require(__dirname + "/js/contextMenu/objectLayer");
const {
   toggleObjectPropertiesWindow,
} = require(__dirname + "/js/contextMenu/objectProperties");

document.addEventListener("DOMContentLoaded", () => {
   initializeZoomButtons(canvas);
});

document.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
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
         toggleContextMenu(canvas, "hide");
      }

      // ctrl + x
      if (event.key.toLowerCase() === "x") {
         event.preventDefault();
         cutObjects(canvas);
         toggleContextMenu(canvas, "hide");
      }

      // ctrl + v
      if (event.key.toLowerCase() === "v") {
         event.preventDefault();
         pasteObjects(canvas);
         toggleContextMenu(canvas, "hide");
      }

      // ctrl + s
      if (event.key.toLowerCase() === "s") {
         event.preventDefault();
         toggleContextMenu(canvas, "hide");
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
   toggleContextMenu(canvas, "hide");
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
   toggleContextMenu(canvas, "hide");
   saveCanvasToJSON(canvas);
});

const saveCanvasToJPEGBtn = document.getElementById("saveCanvasToJPEG");
saveCanvasToJPEGBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   saveCanvasToJPEG(canvas);
});

const saveCanvasToPNGBtn = document.getElementById("saveCanvasToPNG");
saveCanvasToPNGBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   saveCanvasToPNG(canvas);
});

//
// import image to canvas button
//
const importImageBtn = document.getElementById("importImage");
importImageBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   importImage(fabric, canvas);
});

//
// open canvas from JSON button
//
const importCanvasJSONBtn = document.getElementById("importCanvasFromJSON");
importCanvasJSONBtn.addEventListener("click", async () => {
   await toggleContextMenu(canvas, "hide");
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
   copyObjects(canvas);
   toggleContextMenu(canvas, "hide");
});

const cutObjectsBtn = document.getElementById("cutObjects");
cutObjectsBtn.addEventListener("click", () => {
   cutObjects(canvas);
   toggleContextMenu(canvas, "hide");
});

const pasteObjectsBtn = document.getElementById("pasteObjects");
pasteObjectsBtn.addEventListener("click", () => {
   pasteObjects(canvas);
   toggleContextMenu(canvas, "hide");
});

//
// changeCanvasResDialog buttons
//
const openChangeCanvasResDlgBtn = document.getElementById("openChangeCanvasResDialog");
openChangeCanvasResDlgBtn.addEventListener("click", () => {
   if (!canvas) return;
   toggleContextMenu(canvas, "hide");
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
   toggleContextMenu(canvas, "hide");
   zoomOut(canvas);
});

const scaleRangeInput = document.getElementById("scaleRangeInput");
scaleRangeInput.addEventListener("input", () => {
   toggleContextMenu(canvas, "hide");
   zoomRange(canvas);
});

const scaleUpBtn = document.getElementById("scaleUp");
scaleUpBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   zoomIn(canvas);
});

//
// sidebar buttons
//
const generateRectangleBtn = document.getElementById("generateRectangle");
generateRectangleBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   generateRectangle(fabric, canvas);
});

const generateCircleBtn = document.getElementById("generateCircle");
generateCircleBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   generateCircle(fabric, canvas);
});

const generateTextBtn = document.getElementById("generateText");
generateTextBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   generateText(fabric, canvas);
});

const generateLineBtn = document.getElementById("generateLine");
generateLineBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
   generateLine(fabric, canvas);
});

//
// context menu
//
const contextMenuCopyBtn = document.getElementById("contextMenuCopyBtn");
contextMenuCopyBtn.addEventListener("click", () => {
   copyObjects(canvas);
   toggleContextMenu(canvas, "hide");
});

const contextMenuCutBtn = document.getElementById("contextMenuCutBtn");
contextMenuCutBtn.addEventListener("click", () => {
   cutObjects(canvas);
   toggleContextMenu(canvas, "hide");
});

const contextMenuPasteBtn = document.getElementById("contextMenuPasteBtn");
contextMenuPasteBtn.addEventListener("click", () => {
   const { pointerX, pointerY } = getPointerCoordinates();
   pasteObjects(canvas, pointerX, pointerY);
   toggleContextMenu(canvas, "hide");
});

const layerBringToFrontBtn = document.getElementById("layerBringToFrontBtn");
layerBringToFrontBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "bringToFront");
   toggleContextMenu(canvas, "hide");
});

const layerBringForwardBtn = document.getElementById("layerBringForwardBtn");
layerBringForwardBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "bringForward");
   toggleContextMenu(canvas, "hide");
});

const layerSendBackwardBtn = document.getElementById("layerSendBackwardBtn");
layerSendBackwardBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "sendBackward");
   toggleContextMenu(canvas, "hide");
});

const layerSendToBackBtn = document.getElementById("layerSendToBackBtn");
layerSendToBackBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "sendToBack");
   toggleContextMenu(canvas, "hide");
});

const objectPropertiesBtn = document.getElementById("objectPropertiesBtn");
objectPropertiesBtn.addEventListener("click", () => {
   toggleContextMenu(canvas, "hide");
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
