function displayPointerCoordinates(canvas) {
   if (!canvas) return;
   console.log("canvasPointerCoordinates()");
   canvas.on("mouse:move", function(options) {
      var pointer = canvas.getPointer(options.e);
      var x = pointer.x.toFixed(3);
      var y = pointer.y.toFixed(3);

      document.getElementById("canvas_pointer_coordinates_x").textContent = x;
      document.getElementById("canvas_pointer_coordinates_y").textContent = y;
   });
}

module.exports = {
   displayPointerCoordinates
}
