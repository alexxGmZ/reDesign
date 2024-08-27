/**
 * Sets the initial values of the change resolution input fields based on the current
 * canvas resolution displayed.
 */
function changeResInitialValues() {
   console.log("changeResInitialValues()");

   const canvasRes = document.getElementById("displayCanvasResolution").textContent;
   const [canvasWidth, canvasHeight] = canvasRes.split("x").map(Number);

   // initial values for the change resolution input boxes
   document.getElementById("changeResWidth").value = canvasWidth;
   document.getElementById("changeResHeight").value = canvasHeight;
}

module.exports = {
   changeResInitialValues
}
