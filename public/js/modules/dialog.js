/**
 * Opens a dialog by making it visible and applying necessary classes.
 *
 * @param {string} elementId - The ID of the dialog element to be opened.
 */
function dialogOpen(elementId) {
	console.log(`dialogOpen(${elementId})`);
	const favDialog = document.getElementById(elementId);
	favDialog.classList.add("active-dialog");
	favDialog.classList.remove("d-none");
	favDialog.showModal();
}

/**
 * Closes a dialog by hiding it and removing the active state.
 *
 * @param {string} elementId - The ID of the dialog element to be closed.
 */
function dialogClose(elementId) {
	console.log(`dialogClose(${elementId})`);
	const favDialog = document.getElementById(elementId);
	favDialog.classList.remove("active-dialog");
	favDialog.classList.add("d-none");
	favDialog.close();
}

module.exports = {
	dialogOpen,
	dialogClose
}
