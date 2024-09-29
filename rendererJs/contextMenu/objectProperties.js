let changeRectRadiusListener;
let changeRectStrokeWidthListener;
let changeCircStrokeWidthListener;
let changeFontListener;
let changeFontSizeListener;
let changeFillRGBColorBtnListener;
let changeFillRGBAColorBtnListener;
let changeStrokeRGBAColorBtnListener;

/**
 * Closes the object properties window if it is currently visible by setting
 * its display style to "none".
 */
function closeObjectPropertiesWindow() {
   const objPropWindow = document.getElementById("objectPropertiesWindow");
   if (objPropWindow.style.display === "none") return;

   console.log("closeObjectPropertiesWindow()");
   objPropWindow.style.display = "none";
}

/**
 * Opens the object properties window and positions it relative to the pointer coordinates.
 * The window becomes draggable once opened.
 *
 * @param {Object} selectedObject - The selected object on the canvas.
 * @param {number} pointerX - The X coordinate of the pointer.
 * @param {number} pointerY - The Y coordinate of the pointer.
 */
function openObjectPropertiesWindow(selectedObject, pointerX, pointerY) {
   console.log(`openObjectPropertiesWindow(${selectedObject}, ${pointerX}, ${pointerY})`);
   const objPropWindow = document.getElementById("objectPropertiesWindow");
   const canvasZoom = document.getElementById("scaleRangeInput").value;
   const objectType = selectedObject.type;

   objPropWindow.style.display = "block";
   objPropWindow.style.left = ((pointerX * canvasZoom) + 60) + 'px';
   objPropWindow.style.top = ((pointerY * canvasZoom) + 70) + 'px';
   objectPropertiesDragEvent(objPropWindow);

   document.getElementById("objectPropertiesObjectType").innerHTML = objectType;
   document.getElementById("objectPropertiesRect").style.display = "none";
   document.getElementById("objectPropertiesCirc").style.display = "none";
   document.getElementById("objectPropertiesText").style.display = "none";
}

/**
 * Displays and initializes the rectangle object properties in the UI based on the
 * selected Fabric.js rectangle object. Sets up listeners for updating the rectangle's
 * corner radius and stroke width, and populates the fill and stroke RGBA input fields.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance on which the rectangle
 * object exists.
 * @param {fabric.Rect} object - The rectangle object whose properties are displayed and
 * updated.
 */
function rectObjectProperties(canvas, object) {
   console.log(`rectObjectProperties(${canvas}, ${object})`);

   // display rectangle object properties
   document.getElementById("objectPropertiesRect").style.display = "initial";

   const radiusElement = document.getElementById("rectRadius");
   const fillR = document.getElementById("rectFillR");
   const fillG = document.getElementById("rectFillG");
   const fillB = document.getElementById("rectFillB");
   const fillA = document.getElementById("rectFillA");
   const strokeWidthElement = document.getElementById("rectStrokeWidth");
   const strokeR = document.getElementById("rectStrokeR");
   const strokeG = document.getElementById("rectStrokeG");
   const strokeB = document.getElementById("rectStrokeB");
   const strokeA = document.getElementById("rectStrokeA");

   radiusElement.value = object.rx;
   strokeWidthElement.value = object.strokeWidth;

   // WARN: Do not remove this condition or else all rectangle objects will be modified
   if (changeRectRadiusListener)
      radiusElement.removeEventListener("input", changeRectRadiusListener);
   if (changeRectStrokeWidthListener)
      strokeWidthElement.removeEventListener("input", changeRectStrokeWidthListener);

   changeRectRadiusListener = function() {
      console.log("changeRectRadiusListener()")
      object.set({ rx: parseFloat(this.value), ry: parseFloat(this.value) });
      canvas.renderAll();
   }
   changeRectStrokeWidthListener = function() {
      console.log("changeRectStrokeWidthListener()");
      object.set({ strokeWidth: parseFloat(this.value) });
      canvas.renderAll();
   }

   radiusElement.addEventListener("input", changeRectRadiusListener);
   strokeWidthElement.addEventListener("input", changeRectStrokeWidthListener);

   // initialize the rectangle fill RGBA inputs
   var objectFillRGBA = object.fill.match(/\d+/g);
   fillR.value = objectFillRGBA[0];
   fillG.value = objectFillRGBA[1];
   fillB.value = objectFillRGBA[2];
   fillA.value = objectFillRGBA[3];

   // initialize the rectangle stroke RGBA inputs
   var objectStrokeRGBA = object.stroke.match(/\d+/g);
   strokeR.value = objectStrokeRGBA[0];
   strokeG.value = objectStrokeRGBA[1];
   strokeB.value = objectStrokeRGBA[2];
   strokeA.value = objectStrokeRGBA[3];
}

function circObjectProperties(canvas, object) {
   console.log(`circObjectProperties(${canvas}, ${object})`);

   // display circle object properties
   document.getElementById("objectPropertiesCirc").style.display = "initial";

   const fillR = document.getElementById("circFillR");
   const fillG = document.getElementById("circFillG");
   const fillB = document.getElementById("circFillB");
   const fillA = document.getElementById("circFillA");
   const strokeWidthElement = document.getElementById("circStrokeWidth");
   const strokeR = document.getElementById("circStrokeR");
   const strokeG = document.getElementById("circStrokeG");
   const strokeB = document.getElementById("circStrokeB");
   const strokeA = document.getElementById("circStrokeA");

   strokeWidthElement.value = object.strokeWidth;

   if (changeCircStrokeWidthListener)
      strokeWidthElement.removeEventListener("input", changeCircStrokeWidthListener);

   changeCircStrokeWidthListener = function() {
      console.log("changeCircStrokeWidthListener()");
      object.set({ strokeWidth: parseFloat(this.value) });
      canvas.renderAll();
   }

   strokeWidthElement.addEventListener("input", changeCircStrokeWidthListener);

   // initialize the circle fill RGBA inputs
   var objectFillRGBA = object.fill.match(/\d+/g);
   fillR.value = objectFillRGBA[0];
   fillG.value = objectFillRGBA[1];
   fillB.value = objectFillRGBA[2];
   fillA.value = objectFillRGBA[3];

   // initialize the circle stroke RGBA inputs
   var objectStrokeRGBA = object.stroke.match(/\d+/g);
   strokeR.value = objectStrokeRGBA[0];
   strokeG.value = objectStrokeRGBA[1];
   strokeB.value = objectStrokeRGBA[2];
   strokeA.value = objectStrokeRGBA[3];
}

/**
 * Displays and handles text object properties for the selected text object on the
 * canvas. This function updates the UI elements related to font family, font size,
 * and text fill RGB values. It sets up listeners to handle changes in these
 * properties and updates the canvas accordingly.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance.
 * @param {fabric.IText} object - The selected Fabric.js text object (IText) whose
 * properties will be manipulated.
 */
function textObjectProperties(canvas, object) {
   console.log(`textObjectProperties(${canvas}, ${object})`);

   // display text object properties
   document.getElementById("objectPropertiesText").style.display = "initial";

   const fontElement = document.getElementById("textFontSelect");
   const fontSizeElement = document.getElementById("textFontSize");
   const textFillR = document.getElementById("textFillR");
   const textFillG = document.getElementById("textFillG");
   const textFillB = document.getElementById("textFillB");

   fontElement.value = object.fontFamily;
   fontSizeElement.value = object.fontSize;

   // WARN: Do not remove this condition or else all i-text objects will be modified
   if (changeFontListener)
      fontElement.removeEventListener("input", changeFontListener);
   if (changeFontSizeListener)
      fontSizeElement.removeEventListener("input", changeFontSizeListener);

   changeFontListener = function() {
      console.log("changeFontListener()")
      object.set({ fontFamily: this.value });
      canvas.renderAll();
   }
   changeFontSizeListener = function() {
      console.log("changeFontSizeListener()");
      object.set({ fontSize: this.value });
      canvas.renderAll();
   }

   fontElement.addEventListener("input", changeFontListener);
   fontSizeElement.addEventListener("input", changeFontSizeListener);

   // initialize the text fill RGB inputs
   var objectFillRGB = object.fill.match(/\d+/g);
   textFillR.value = objectFillRGB[0];
   textFillG.value = objectFillRGB[1];
   textFillB.value = objectFillRGB[2];
}

/**
 * Initializes a color picker and synchronizes it with RGB input fields. The color picker
 * allows the user to pick a color for a selected object, and the RGB inputs allow manual
 * input of RGB values. Updates the object fill color on the canvas and re-renders the
 * canvas when the color changes.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance.
 * @param {Object} iro - The iro.js color picker library.
 * @param {fabric.Object} object - The Fabric.js object to which the color will be
 * applied.
 * @param {Array<string>} colorPickerAndRGBFieldsIDs - Array containing the IDs for the
 * color picker, RGB input fields, and the button to apply the color change.
 * The array must follow this index order:
 *
 *  - Index 0: ID of the HTML element where the iro color picker will be generated.
 *  - Index 1: ID of the input element for the red (R) value.
 *  - Index 2: ID of the input element for the green (G) value.
 *  - Index 3: ID of the input element for the blue (B) value.
 *  - Index 4: ID of the button that, when clicked, will update the object's color on the
 *    canvas.
 */
function colorPickerRGB(canvas, iro, object, colorPickerAndRGBFieldsIDs) {
   console.log(`colorPickerRGB(${canvas}, ${iro}, ${object}, ${colorPickerAndRGBFieldsIDs})`);
   const colorPickerElementId = colorPickerAndRGBFieldsIDs[0];
   const inputRed = document.getElementById(colorPickerAndRGBFieldsIDs[1]);
   const inputGreen = document.getElementById(colorPickerAndRGBFieldsIDs[2]);
   const inputBlue = document.getElementById(colorPickerAndRGBFieldsIDs[3]);
   const changeColorBtn = document.getElementById(colorPickerAndRGBFieldsIDs[4]);

   const colorPicker = new iro.ColorPicker(`#${colorPickerElementId}`, {
      width: 150,
      color: object.fill,
      layoutDirection: "horizontal",
      borderWidth: 1,
      borderColor: "#000000"
   });

   let red = inputRed.value;
   let green = inputGreen.value;
   let blue = inputBlue.value;

   colorPicker.on("color:change", (color) => {
      red = color.rgb.r;
      green = color.rgb.g;
      blue = color.rgb.b;
      inputRed.value = red;
      inputGreen.value = green;
      inputBlue.value = blue;
   });

   function updateColorPicker() {
      var newColor = `rgb(${red}, ${green}, ${blue})`
      colorPicker.color.set(newColor);
   }

   inputRed.addEventListener("input", function() {
      red = this.value;
      updateColorPicker();
   });
   inputGreen.addEventListener("input", function() {
      green = this.value;
      updateColorPicker();
   });
   inputBlue.addEventListener("input", function() {
      blue = this.value;
      updateColorPicker();
   });

   if (changeFillRGBColorBtnListener)
      changeColorBtn.removeEventListener("click", changeFillRGBColorBtnListener);

   changeFillRGBColorBtnListener = () => {
      object.set({ fill: `rgb(${red}, ${green}, ${blue})` });
      canvas.renderAll();
   }

   changeColorBtn.addEventListener("click", changeFillRGBColorBtnListener);
}

/**
 * Sets up a color picker and RGBA input fields for updating the fill or stroke color of
 * a Fabric.js object. The selected color can be applied to either the "stroke" or "fill"
 * property, depending on the `strokeOrFill` parameter.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance on which the object exists.
 * @param {iro.ColorPicker} iro - The iro.js color picker instance for selecting colors.
 * @param {fabric.Object} object - The Fabric.js object whose fill or stroke color is updated.
 * @param {String} strokeOrFill - Specifies whether the "stroke" or "fill" property is updated.
 * @param {Array<String>} colorPickerAndRGBAFieldsIDs - An array of element IDs for the color
 * picker and the RGBA input fields. The array must follow this index order:
 *
 *  - Index 0: ID of the HTML element where the iro color picker will be generated.
 *  - Index 1: ID of the input element for the red (R) value.
 *  - Index 2: ID of the input element for the green (G) value.
 *  - Index 3: ID of the input element for the blue (B) value.
 *  - Index 4: ID of the input element for the alpha (A) value.
 *  - Index 5: ID of the button that, when clicked, will update the object's color on the
 *    canvas.
 */
function colorPickerRGBA(canvas, iro, object, strokeOrFill, colorPickerAndRGBAFieldsIDs) {
   console.log(`colorPickerRGBA(${canvas}, ${iro}, ${object}, ${strokeOrFill}, ${colorPickerAndRGBAFieldsIDs})`)
   const colorPickerElementId = colorPickerAndRGBAFieldsIDs[0];
   const inputRed = document.getElementById(colorPickerAndRGBAFieldsIDs[1]);
   const inputGreen = document.getElementById(colorPickerAndRGBAFieldsIDs[2]);
   const inputBlue = document.getElementById(colorPickerAndRGBAFieldsIDs[3]);
   const inputAlpha = document.getElementById(colorPickerAndRGBAFieldsIDs[4]);
   const changeColorBtn = document.getElementById(colorPickerAndRGBAFieldsIDs[5]);

   const colorPicker = new iro.ColorPicker(`#${colorPickerElementId}`, {
      width: 150,
      color: object[strokeOrFill],
      layoutDirection: "horizontal",
      borderWidth: 1,
      borderColor: "#000000",
      layout: [
         { component: iro.ui.Wheel, options: {} },
         { component: iro.ui.Slider, options: { sliderType: "value" } },
         { component: iro.ui.Slider, options: { sliderType: "alpha" } },
      ]
   });

   let red = inputRed.value;
   let green = inputGreen.value;
   let blue = inputBlue.value;
   let alpha = inputAlpha.value;

   colorPicker.on("color:change", (color) => {
      red = color.rgba.r;
      green = color.rgba.g;
      blue = color.rgba.b;
      alpha = color.rgba.a;
      inputRed.value = red;
      inputGreen.value = green;
      inputBlue.value = blue;
      inputAlpha.value = alpha;
   });

   function updateColorPicker() {
      var newColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`
      colorPicker.color.set(newColor);
   }

   inputRed.addEventListener("input", function() {
      red = this.value;
      updateColorPicker();
   });
   inputGreen.addEventListener("input", function() {
      green = this.value;
      updateColorPicker();
   });
   inputBlue.addEventListener("input", function() {
      blue = this.value;
      updateColorPicker();
   });
   inputAlpha.addEventListener("input", function() {
      alpha = this.value;
      updateColorPicker();
   });

   function updateObjectColor(property) {
      return () => {
         object.set({ [property]: `rgba(${red}, ${green}, ${blue}, ${alpha})` });
         canvas.renderAll();
      };
   }

   // NOTE: Removing previous event listeners prevents multiple listeners from stacking up
   // on the button, which could cause bugs by executing the listener multiple times.
   if (strokeOrFill === "fill") {
      if (changeFillRGBAColorBtnListener)
         changeColorBtn.removeEventListener("click", changeFillRGBAColorBtnListener);

      changeFillRGBAColorBtnListener = updateObjectColor("fill");
      changeColorBtn.addEventListener("click", changeFillRGBAColorBtnListener);
   } else if (strokeOrFill === "stroke") {
      if (changeStrokeRGBAColorBtnListener)
         changeColorBtn.removeEventListener("click", changeStrokeRGBAColorBtnListener);

      changeStrokeRGBAColorBtnListener = updateObjectColor("stroke");
      changeColorBtn.addEventListener("click", changeStrokeRGBAColorBtnListener);
   }
}

/**
 * Enables drag functionality for the object properties window (`objPropWindow`).
 *
 * @param {HTMLElement} objPropWindow - The object properties window to be dragged.
 */
function objectPropertiesDragEvent(objPropWindow) {
   console.log(`objectPropertiesDragEvent(${objPropWindow})`);
   const objPropHeader = document.getElementById("objectPropertiesHeader");
   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

   if (objPropHeader) {
      // if present, the header is where you move the DIV from:
      objPropHeader.onmousedown = dragMouseDown;
   } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      objPropWindow.onmousedown = dragMouseDown;
   }

   function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
   }

   function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      objPropWindow.style.top = (objPropWindow.offsetTop - pos2) + "px";
      objPropWindow.style.left = (objPropWindow.offsetLeft - pos1) + "px";
   }

   function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
   }
}

module.exports = {
   closeObjectPropertiesWindow,
   openObjectPropertiesWindow,
   rectObjectProperties,
   circObjectProperties,
   textObjectProperties,
   colorPickerRGB,
   colorPickerRGBA
}
