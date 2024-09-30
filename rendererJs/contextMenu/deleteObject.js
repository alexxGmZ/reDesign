/**
 * Deletes the currently selected objects from the Fabric.js canvas. If no objects are
 * selected, the function exits early. After deletion, the canvas is re-rendered.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance from which the selected
 * objects will be deleted.
 */
function deleteObject(canvas) {
   if (!canvas) return;
   console.log(`deleteObject(${canvas})`);

   const selectedObjects = canvas.getActiveObjects();
   if (selectedObjects.length > 0) {
      selectedObjects.forEach(obj => {
         canvas.remove(obj);
         console.log(`Deleted object - Type: ${obj.type}`);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
   }
}

module.exports = {
   deleteObject
}
