/**
 * Generates a rectangle on the specified Fabric.js canvas.
 *
 * @param {Object} fabric - The Fabric.js library object.
 * @param {Object} canvas - The Fabric.js canvas instance where the rectangle will be added.
 */
function generateRectangle(fabric, canvas) {
   if (!canvas) return;
   console.log(`generateRectangle(${fabric}, ${canvas})`);
   const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      fill: "rgba(255, 255, 255, 0)",
      stroke: "rgba(0, 0, 0, 1)",
      strokeWidth: 2,
      strokeUniform: true
   });

   canvas.add(rect);
   canvas.setActiveObject(rect);
}

/**
 * Generates a circle on the specified Fabric.js canvas.
 *
 * @param {Object} fabric - The Fabric.js library object.
 * @param {Object} canvas - The Fabric.js canvas instance where the circle will be added.
 */
function generateCircle(fabric, canvas) {
   if (!canvas) return;
   console.log(`generateCircle(${fabric}, ${canvas})`);
   const circle = new fabric.Circle({
      radius: 20,
      left: 100,
      top: 100,
      fill: "rgba(255, 255, 255, 0)",
      stroke: "rgba(0, 0, 0, 1)",
      strokeWidth: 2,
      strokeUniform: true
   })

   canvas.add(circle);
   canvas.setActiveObject(circle);
}

/**
 * Generates a text object on the specified Fabric.js canvas.
 *
 * @param {Object} fabric - The Fabric.js library object.
 * @param {Object} canvas - The Fabric.js canvas instance where the text will be added.
 */
function generateText(fabric, canvas) {
   if (!canvas) return;
   console.log(`generateText(${fabric}, ${canvas})`);
   const text = new fabric.IText("text", {
      left: 100,
      top: 100,
      fontSize: 30
   });

   canvas.add(text);
   canvas.setActiveObject(text);
}

/**
 * Generates a line on the specified Fabric.js canvas.
 *
 * @param {Object} fabric - The Fabric.js library object.
 * @param {Object} canvas - The Fabric.js canvas instance where the line will be added.
 */
function generateLine(fabric, canvas) {
	if (!canvas) return;
	console.log(`generateLine(${fabric}, ${canvas})`);
	const line = new fabric.Line([10, 50, 100, 50], {
		stroke: "rgba(0, 0, 0, 1)",        // Line color
		strokeWidth: 2,       // Line width
	});

	canvas.add(line);
	canvas.setActiveObject(line);
}

module.exports = {
   generateRectangle,
   generateCircle,
   generateText,
   generateLine
}
