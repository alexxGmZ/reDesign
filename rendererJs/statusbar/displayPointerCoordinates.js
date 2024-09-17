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

module.exports = {
   displayPointerCoordinates
}
