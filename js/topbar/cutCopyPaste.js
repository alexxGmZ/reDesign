let clipboard = null;

/**
 * Copies the currently selected objects on the Fabric.js canvas to the clipboard.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance from which objects
 * are copied.
 */
function copyObjects(canvas) {
   if (!canvas) return;

   console.log(`copyObjects(${canvas})`);
   canvas.getActiveObject().clone((cloned) => {
      clipboard = cloned;
      if (cloned.type === 'activeSelection') {
         cloned.forEachObject((obj) => {
            console.log(`Copied object - Type: ${obj.type}`);
         });
      }
      else console.log(`Copied object - Type: ${cloned.type}`);
   });
}

/**
 * Cuts the selected objects from the Fabric.js canvas, cloning them to the clipboard
 * and removing them from the canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance from which the
 * objects will be cut.
 */
function cutObjects(canvas) {
   if (!canvas) return;
   console.log(`cutObjects(${canvas})`);

   canvas.getActiveObject().clone((cloned) => {
      clipboard = cloned;
      if (cloned.type === 'activeSelection') {
         cloned.forEachObject((obj) => {
            console.log(`Cutted object - Type: ${obj.type}`);
         });
      }
      else console.log(`Cutted object - Type: ${cloned.type}`);

      // remove active objects
      const selectedObjects = canvas.getActiveObjects();
      selectedObjects.forEach((obj) => {
         canvas.remove(obj);
      });
      canvas.discardActiveObject();
      canvas.requestRenderAll();
   });
}

/**
 * Pastes the objects from the clipboard onto the Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the objects will be pasted.
 * @param {number} pointerX - The x-coordinate for object placement if using the mouse.
 * @param {number} pointerY - The y-coordinate for object placement if using the mouse.
 */
function pasteObjects(canvas, pointerX, pointerY) {
   if (!canvas || !clipboard) return;
   console.log(`called pasteObjects(${canvas}, ${pointerX}, ${pointerY})`);

   clipboard.clone(function(clonedObj) {
      canvas.discardActiveObject();
      // if pointerX and pointerY has value
      if (pointerX && pointerY) {
         clonedObj.set({
            left: parseFloat(pointerX),
            top: parseFloat(pointerY),
            evented: true,
         });
      }

      // else below the original object
      else {
         clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
         });
      }

      if (clonedObj.type === 'activeSelection') {
         // active selection needs a reference to the canvas.
         clonedObj.canvas = canvas;
         clonedObj.forEachObject((obj) => {
            canvas.add(obj);
            console.log(`Pasted object - Type: ${obj.type}`);
         });
         // this should solve the unselectability
         clonedObj.setCoords();
      }
      else {
         canvas.add(clonedObj);
         console.log(`Pasted object - Type: ${clonedObj.type}`);
      }

      clipboard.top += 10;
      clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
   });
}

module.exports = {
   copyObjects,
   cutObjects,
   pasteObjects
}
