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

function cutObjects(canvas) {

}

/**
 * Pastes the objects from the clipboard onto the Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the objects will be pasted.
 * @param {string} toolUsed - The tool used to paste objects, either "mouse" or another method, which affects object positioning.
 * @param {number} pointerX - The x-coordinate for object placement if using the mouse.
 * @param {number} pointerY - The y-coordinate for object placement if using the mouse.
 */
function pasteObjects(canvas, toolUsed, pointerX, pointerY) {
   console.log(`called pasteObjects(${canvas}, ${toolUsed}, ${pointerX}, ${pointerY})`);

   clipboard.clone(function(clonedObj) {
      canvas.discardActiveObject();
      // if mouse is used to paste then position objects in the mouse
      if (toolUsed === "mouse") {
         clonedObj.set({
            left: pointerX,
            top: pointerY,
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
