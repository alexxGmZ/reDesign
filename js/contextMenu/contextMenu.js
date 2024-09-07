/**
 * Tracks and returns the pointer coordinates.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to track pointer
 * movements on.
 * @returns {Promise<{pointerX: number, pointerY: number}>} - A promise that resolves
 * with the pointer coordinates as numbers when the mouse moves, or rejects with an
 * error message if pointer data is unavailable.
 */
function getPointerCoordinates(canvas) {
   if (!canvas) return;
   console.log(`getPointerCoordinates(${canvas})`);

   return new Promise((resolve, reject) => {
      canvas.on("mouse:move", (options) => {
         const pointer = canvas.getPointer(options.e);
         if (!pointer) return reject("No pointer data");

         const pointerX = parseFloat(pointer.x.toFixed(3));
         const pointerY = parseFloat(pointer.y.toFixed(3));

         resolve({ pointerX, pointerY });
      });
   });
}

/**
 * Toggles the context menu visibility on canvas mouse events.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to monitor for mouse
 * events.
 */
function toggleContextMenu(canvas) {
   if (!canvas) return;
   console.log(`toggleContextMenu(${canvas})`);

   canvas.on("mouse:up", (event) => {
      console.log("canvas mouse:up event");
      const selectedObjects = canvas.getActiveObjects();
      const isLeftClick = event.button === 1;
      const isRightClick = event.button === 3;

      // if canvas is clicked
      if (selectedObjects.length === 0) {
         if (isLeftClick) {
            console.log("left click");
            contextMenu(canvas, "hide");
         }

         // show context menu when right-clicked in any place of canvas
         if (isRightClick) {
            console.log("right click");
            contextMenu(canvas, "show");
         }
      }

      // if object/s are clieked
      else {
         selectedObjects.forEach((object) => {
            if (isLeftClick)
               console.log(`Left clicked object - Type: ${object.type}`);

            if (isRightClick)
               console.log(`Right clicked object - Type: ${object.type}`);
         });

         if (isRightClick) contextMenu(canvas, "show");
      }
   });

   canvas.on("mouse:down", () => {
      console.log("canvas mouse:down event");
      // hide context menu when the mouse is pressed down
      contextMenu(canvas, "hide");
   });
}

/**
 * Controls the display of the context menu on the canvas based on user interactions.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the context menu
 * is shown or hidden.
 * @param {string} displayType - Specifies whether to "show" or "hide" the context
 * menu.
 */
function contextMenu(canvas, displayType) {
   console.log(`contextMenu(${canvas}, ${displayType})`);
   const contextMenu = document.getElementById("contextMenu");

   if (displayType == "hide") {
      contextMenu.style.display = "none";
   }

   else if (displayType == "show") {
      const pointerX = parseFloat(document.getElementById("canvasPntrCoordsX").textContent).toFixed(1);
      const pointerY = parseFloat(document.getElementById("canvasPntrCoordsY").textContent).toFixed(1);
      const canvasZoom = document.getElementById("scaleRangeInput").value;

      contextMenu.style.display = "block";
      contextMenu.style.left = ((pointerX * canvasZoom) + 70) + 'px';
      contextMenu.style.top = ((pointerY * canvasZoom) + 80) + 'px';

      const layerBringToFront = document.getElementById("layerBringToFront");
      const layerBringForward = document.getElementById("layerBringForward");
      const layerSendBackward = document.getElementById("layerSendBackward");
      const layerSendToBack = document.getElementById("layerSendToBack");
      const objectProperties = document.getElementById("objectProperties");

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
}

module.exports = {
   getPointerCoordinates,
   toggleContextMenu,
   contextMenu
}
