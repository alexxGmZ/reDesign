/**
 * Retrieves the current pointer coordinates from the DOM elements showing the canvas
 * pointer positions.
 *
 * @returns {{pointerX: number, pointerY: number}} - The current pointer coordinates
 * as numbers with one decimal precision.
 */
function getPointerCoordinates() {
   console.log(`getPointerCoordinates()`);

   const pointerXElement = document.getElementById("canvasPntrCoordsX").textContent;
   const pointerYElement = document.getElementById("canvasPntrCoordsY").textContent;
   const pointerX = parseFloat(pointerXElement).toFixed(1);
   const pointerY = parseFloat(pointerYElement).toFixed(1);

   return { pointerX, pointerY };
}

/**
 * Toggles the context menu visibility on canvas mouse events.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to monitor for mouse
 * events.
 */
function mouseContextMenu(canvas) {
   if (!canvas) return;
   console.log(`mouseContextMenu(${canvas})`);

   canvas.on("mouse:up", (event) => {
      // if the canvas or canvas objects are right clicked
      if (event.button === 3) showContextMenu(canvas);
   });

   canvas.on("mouse:down", () => {
      console.log("canvas mouse:down event");
      // hide context menu when the mouse is pressed down
      hideContextMenu();
   });
}

/**
 * Hides the context menu by setting its display style to "none".
 */
function hideContextMenu() {
   console.log(`hideContextMenu()`);
   const contextMenu = document.getElementById("contextMenu");
   contextMenu.style.display = "none";
}

/**
 * Displays the context menu at the current pointer location and adjusts its options
 * based on the number of selected objects on the canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to use for displaying
 * the context menu and checking selected objects.
 */
function showContextMenu(canvas) {
   if (!canvas) return;
   console.log(`showContextMenu(${canvas})`);
   const contextMenu = document.getElementById("contextMenu");
   const { pointerX, pointerY } = getPointerCoordinates();
   const canvasZoom = document.getElementById("scaleRangeInput").value;

   contextMenu.style.display = "block";
   contextMenu.style.left = ((pointerX * canvasZoom) + 60) + "px";
   contextMenu.style.top = ((pointerY * canvasZoom) + 70) + "px";

   const layerBringToFront = document.getElementById("layerBringToFront");
   const layerBringForward = document.getElementById("layerBringForward");
   const layerSendBackward = document.getElementById("layerSendBackward");
   const layerSendToBack = document.getElementById("layerSendToBack");
   const objectProperties = document.getElementById("objectPropertiesBtn");

   layerBringToFront.style.display = "none";
   layerBringForward.style.display = "none";
   layerSendBackward.style.display = "none";
   layerSendToBack.style.display = "none";
   objectProperties.style.display = "none";

   const selectedObjects = canvas.getActiveObjects();

   if (selectedObjects.length > 0) {
      layerBringToFront.style.display = "flex";
      layerBringForward.style.display = "flex";
      layerSendBackward.style.display = "flex";
      layerSendToBack.style.display = "flex";
   }

   // show context menu properties if there's only one object selected
   if (selectedObjects.length == 1) {
      objectProperties.style.display = "flex";
   }
}

module.exports = {
   getPointerCoordinates,
   mouseContextMenu,
   hideContextMenu,
   showContextMenu
}
