let clipboard = null;

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
