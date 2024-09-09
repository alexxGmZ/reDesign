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

module.exports = {
   adjustObjectLayer
}
