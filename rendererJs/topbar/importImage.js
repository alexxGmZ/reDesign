/**
 * Imports an image into the Fabric.js canvas from a given URL. The image is positioned
 * at the default coordinates (100, 100) and added to the canvas. The canvas is then
 * re-rendered.
 *
 * @param {Object} fabric - The Fabric.js library instance used for creating
 * the image object.
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the image
 * will be added.
 * @param {string} imageURL - The URL of the image to import into the canvas.
 */
function importImage(fabric, canvas, imageURL) {
   if (!canvas) return;
   console.log(`ipcImportImage(${fabric}, ${canvas})`);
   fabric.Image.fromURL(imageURL, (img) => {
      img.set({ left: 100, top: 100 });
      canvas.add(img);
      canvas.renderAll();
   });
}

module.exports = {
   importImage
}
