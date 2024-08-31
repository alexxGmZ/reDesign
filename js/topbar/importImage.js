var importEventListener;

/**
 * Imports an image from the user's file system and adds it to the Fabric.js canvas.
 *
 * @param {fabric} fabric - The Fabric.js library instance used to create and
 * manipulate canvas objects.
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the imported
 * image will be added.
 */
function importImage(fabric, canvas) {
   if (!canvas) return;
   console.log(`importImage(${fabric}, ${canvas})`);

   const importImageInput = document.getElementById("importImageInput");

   // FIX: fixes the multiple image import.
   if (importEventListener) {
      importImageInput.removeEventListener("change", importEventListener);
   }

   importEventListener = function(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = function(event) {
         const imageURL = event.target.result;

         fabric.Image.fromURL(imageURL, (img) => {
            img.set({ left: 100, top: 100 });
            canvas.add(img);
            canvas.renderAll();
         });
      }
      reader.readAsDataURL(file);
   }

   importImageInput.click();
   importImageInput.addEventListener("change", importEventListener);
}

module.exports = {
   importImage
}
