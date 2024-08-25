console.log(__dirname)

const { dialogOpen, dialogClose } = require(__dirname + "/js/modules/dialog");

const openCreateCanvasDialogBtn = document.getElementById("openCreateCanvasDialog");
openCreateCanvasDialogBtn.addEventListener("click", () => {
   dialogOpen("createCanvasDialog");
});

const closeCreateCanvasDialogBtn = document.getElementById("closeCreateCanvasDialog");
closeCreateCanvasDialogBtn.addEventListener("click", () => {
   dialogClose("createCanvasDialog");
});
