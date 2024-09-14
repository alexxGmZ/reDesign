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
   document.getElementById("objectPropertiesText").style.display = "none";
}

/**
 * NOTE: Work in Progress
 */
let changeFontListener;
let changeFontSizeListener;
function textObjectProperties(canvas, iro, object) {
   console.log(`textObjectProperties(${canvas}, ${iro}, ${object})`);

   // display text object properties
   document.getElementById("objectPropertiesText").style.display = "initial";

   const fontElement = document.getElementById("textFontSelect");
   const fontSizeElement = document.getElementById("textFontSize");

   fontElement.value = object.fontFamily;
   fontSizeElement.value = object.fontSize;

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
   textObjectProperties
}
