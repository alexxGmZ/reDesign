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
