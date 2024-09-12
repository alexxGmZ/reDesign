function toggleObjectPropertiesWindow(canvas, displayType, pointerX, pointerY) {
   if (!canvas) return;
   console.log(`toggleObjectPropertiesWindow(${canvas}, ${displayType}, ${pointerX}, ${pointerY})`);
   const objPropWindow = document.getElementById("objectPropertiesWindow");

   if (displayType === "hide") {
      console.log("hide");
      objPropWindow.style.display = "none";
   }

   else if (displayType === "show") {
      console.log("show");
      const canvasZoom = document.getElementById("scaleRangeInput").value;
      const selectedObject = canvas.getActiveObjects()[0];
      const objectType = selectedObject.type;

      objPropWindow.style.display = "block";
      objPropWindow.style.left = ((pointerX * canvasZoom) + 60) + 'px';
      objPropWindow.style.top = ((pointerY * canvasZoom) + 70) + 'px';
      objectPropertiesDragEvent();

      document.getElementById("objectPropertiesObjectType").innerHTML = objectType;
   }
}

function objectPropertiesDragEvent() {
   console.log("objectPropertiesDragEvent()");
   const objPropWindow = document.getElementById("objectPropertiesWindow");
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
   toggleObjectPropertiesWindow
}
