/**
 * Adjusts the layer position of the selected objects on the canvas based on the
 * specified action.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance containing the objects.
 * @param {string} action - The action to perform on the selected objects. Valid actions
 * are "bringToFront", "bringForward", "sendBackward", and "sendToBack".
 */
function adjustObjectLayer(canvas, action) {
   console.log(`adjustObjectLayer(${canvas}, ${action})`);
   const selectedObjects = canvas.getActiveObjects();
   const actions = {
      bringToFront: canvas.bringToFront,
      bringForward: canvas.bringForward,
      sendBackward: canvas.sendBackwards,
      sendToBack: canvas.sendToBack
   };

   selectedObjects.forEach((object) => {
      const objectAction = actions[action];
      if (objectAction) objectAction.call(canvas, object);
   });

   canvas.requestRenderAll();
}

/**
 * Retrieves the layer stack of objects on the canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to get objects from.
 * @returns {Object[]} - An array of objects representing the layer stack, with each
 * object containing:
 *  - `index` {number}: The index of the canvas object in the stack.
 *  - `type` {string}: The type of the canvas object.
 * The array is reversed to reflect the topmost object first.
 */
function getObjectsLayerStack(canvas) {
   console.log(`getObjectsLayerStack(${canvas})`);
   return canvas.getObjects()
      .map((object, index) => ({ index, type: object.type }))
      .reverse();
}

module.exports = {
   adjustObjectLayer,
   getObjectsLayerStack
}
