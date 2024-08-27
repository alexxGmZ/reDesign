function displayPointerCoordinates(canvas) {
   if (!canvas) return;
   console.log("canvasPointerCoordinates()");
   canvas.on("mouse:move", function(options) {
      var pointer = canvas.getPointer(options.e);
      var x = pointer.x.toFixed(3);
      var y = pointer.y.toFixed(3);

      document.getElementById("canvasPntrCoordsX").textContent = x;
      document.getElementById("canvasPntrCoordsY").textContent = y;
   });
}

module.exports = {
   displayPointerCoordinates
}
