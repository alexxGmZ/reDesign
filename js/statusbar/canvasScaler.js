/**
 * Scales the Fabric.js canvas based on user input from buttons, range input, or
 * keyboard shortcuts.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to be scaled.
 */
function canvasScaler(canvas) {
   console.log(`canvasScaler(${canvas})`);

   const scaleDownBtn = document.getElementById("scaleDown");
   const scaleRangeInput = document.getElementById("scaleRangeInput");
   const scaleUpBtn = document.getElementById("scaleUp");
   const scaleMultiplierText = document.getElementById("scaleMultiplierText");

   // disable buttons and input if canvas is not initialized
   if (!canvas) {
      scaleDownBtn.disabled = true;
      scaleRangeInput.disabled = true;
      scaleUpBtn.disabled = true;
      return;
   }

   scaleDownBtn.disabled = false;
   scaleRangeInput.disabled = false;
   scaleUpBtn.disabled = false;

   const rangeStep = parseFloat(scaleRangeInput.step);
   const rangeMax = parseFloat(scaleRangeInput.max);
   const rangeMin = parseFloat(scaleRangeInput.min);
   const canvasWidth = canvas.getWidth();
   const canvasHeight = canvas.getHeight();
   scaleMultiplierText.textContent = scaleRangeInput.value + "x";

   scaleDownBtn.addEventListener("click", () => {
      // stop if rangeMin is reached
      if (parseFloat(scaleRangeInput.value) <= rangeMin) return;
      console.log("Zoom Out")

      scaleRangeInput.value = parseFloat(scaleRangeInput.value) - rangeStep;
      canvas.setWidth(canvasWidth * parseFloat(scaleRangeInput.value));
      canvas.setHeight(canvasHeight * parseFloat(scaleRangeInput.value));
      canvas.setZoom(parseFloat(scaleRangeInput.value));
      scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
   });

   scaleUpBtn.addEventListener("click", () => {
      // stop if rangeMax is reached
      if (parseFloat(scaleRangeInput.value) >= rangeMax) return;
      console.log("Zoom In")

      scaleRangeInput.value = parseFloat(scaleRangeInput.value) + rangeStep;
      canvas.setWidth(canvasWidth * parseFloat(scaleRangeInput.value));
      canvas.setHeight(canvasHeight * parseFloat(scaleRangeInput.value));
      canvas.setZoom(parseFloat(scaleRangeInput.value));
      scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
   });

   scaleRangeInput.addEventListener("input", () => {
      scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
      canvas.setWidth(canvasWidth * parseFloat(scaleRangeInput.value));
      canvas.setHeight(canvasHeight * parseFloat(scaleRangeInput.value));
      canvas.setZoom(parseFloat(scaleRangeInput.value));
   });

   // keymap
   document.addEventListener("keydown", (event) => {
      if (event.ctrlKey) {
         // Zoom in with Ctrl + "+"
         if (event.key === "+" || event.key === "=") {  // Some keyboards use "=" for "+" key without Shift
            event.preventDefault();
            if (parseFloat(scaleRangeInput.value) >= rangeMax) return;
            console.log("Zoom In (key)")

            scaleRangeInput.value = parseFloat(scaleRangeInput.value) + rangeStep;
            canvas.setWidth(canvasWidth * parseFloat(scaleRangeInput.value));
            canvas.setHeight(canvasHeight * parseFloat(scaleRangeInput.value));
            canvas.setZoom(parseFloat(scaleRangeInput.value));
            scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
         }

         // Zoom out with Ctrl + "-"
         if (event.key === "-") {
            event.preventDefault();
            if (parseFloat(scaleRangeInput.value) <= rangeMin) return;

            console.log("Zoom Out (key)")

            scaleRangeInput.value = parseFloat(scaleRangeInput.value) - rangeStep;
            canvas.setWidth(canvasWidth * parseFloat(scaleRangeInput.value));
            canvas.setHeight(canvasHeight * parseFloat(scaleRangeInput.value));
            canvas.setZoom(parseFloat(scaleRangeInput.value));
            scaleMultiplierText.textContent = parseFloat(scaleRangeInput.value) + "x";
         }
      }
   });
}

module.exports = {
   canvasScaler
}
