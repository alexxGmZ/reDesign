var fabric = require("fabric");
var canvas;
var iro = require("@jaames/iro");
var { dialogOpen, dialogClose } = require(__dirname + "/js/modules/dialog");
var { generateCanvas, createCanvasColorPicker } = require(__dirname + "/js/topbar/createCanvas");
var { displayPointerCoordinates } = require(__dirname + "/js/statusbar/canvasPointerCoordinates");

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
});

