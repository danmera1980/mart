export function openDialog(text, callback) {
  const dialogOverlay = document.createElement("div");
  dialogOverlay.id = "dialogOverlay";

  const dialogBox = document.createElement("div");
  dialogBox.id = "dialogBox";

  const dialogText = document.createElement("div");
  dialogText.id = "dialogText";
  dialogText.textContent = text;

  const dialogButtons = document.createElement("div");
  dialogButtons.id = "dialogButtons";

  const confirmButton = document.createElement("button");
  confirmButton.classList.add("confirm-btn")
  confirmButton.textContent = "Confirm";

  const cancelButton = document.createElement("button");
  cancelButton.classList.add("cancel-btn")
  cancelButton.textContent = "Cancel";

  dialogButtons.appendChild(confirmButton);
  dialogButtons.appendChild(cancelButton);

  dialogBox.appendChild(dialogText);
  dialogBox.appendChild(dialogButtons);

  dialogOverlay.appendChild(dialogBox);

  document.body.appendChild(dialogOverlay);

  const confirmHandler = () => {
    callback(true);
    closeDialog();
  };

  const cancelHandler = () => {
    callback(false);
    closeDialog();
  };

  confirmButton.addEventListener("click", confirmHandler);
  cancelButton.addEventListener("click", cancelHandler);

  dialogOverlay.style.display = "block";

  const eventListeners = {
    confirmHandler,
    cancelHandler,
  };

  dialogOverlay.eventListeners = eventListeners;
}

function closeDialog() {
  const dialogOverlay = document.getElementById("dialogOverlay");
  const eventListeners = dialogOverlay.eventListeners;

  const confirmButton = dialogOverlay.querySelector("button");
  const cancelButton = dialogOverlay.querySelector("button:last-child");

  confirmButton.removeEventListener("click", eventListeners.confirmHandler);
  cancelButton.removeEventListener("click", eventListeners.cancelHandler);

  dialogOverlay.style.display = "none";
  document.body.removeChild(dialogOverlay);
}
