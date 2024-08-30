/**
 * Tracks and displays the pointer coordinates.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to track pointer
 * movements on.
 */
function displayPointerCoordinates(canvas) {
   if (!canvas) return;
   console.log(`displayPointerCoordinates(${canvas})`);

   canvas.on("mouse:move", (options) => {
      const pointer = canvas.getPointer(options.e);

      const pointerX = parseFloat(pointer.x.toFixed(3));
      const pointerY = parseFloat(pointer.y.toFixed(3));

      document.getElementById("canvasPntrCoordsX").textContent = pointerX;
      document.getElementById("canvasPntrCoordsY").textContent = pointerY;
   });
}

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

module.exports = {
   displayPointerCoordinates,
   getPointerCoordinates
}
