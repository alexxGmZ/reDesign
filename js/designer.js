const fabric = require("fabric");
var canvas;
const iro = require("@jaames/iro");
const { dialogOpen, dialogClose } = require(__dirname + "/js/modules/dialog");
const { generateCanvas, createCanvasColorPicker } = require(__dirname + "/js/topbar/createCanvas");
const { displayPointerCoordinates } = require(__dirname + "/js/statusbar/canvasPointerCoordinates");

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
   generateCanvas(fabric, canvas);
   displayPointerCoordinates(canvas);
   dialogClose("createCanvasDialog");

   // FIX: fixes the incrementing color picker
   document.getElementById("canvasColorPicker").innerHTML = "";
});

//
// changeCanvasResDialog buttons
//
const openChangeCanvasResDlgBtn = document.getElementById("openChangeCanvasResDialog");
openChangeCanvasResDlgBtn.addEventListener("click", () => {
   dialogOpen("changeCanvasResDialog");
});

const closeChangeCanvasResDlgBtn = document.getElementById("closeChangeResolutionDialog");
closeChangeCanvasResDlgBtn.addEventListener("click", () => {
   dialogClose("changeCanvasResDialog");
});
