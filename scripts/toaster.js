export function createToaster(message, duration, type = 'info') {
  const toasterContainer = document.getElementById("toaster-container");
  const toaster = document.createElement("div");
  toaster.classList.add("toaster");
  toaster.classList.add(`toaster-${type}`);
  
  toaster.textContent = message;

  const toasterClose = document.createElement("span");
  toasterClose.classList.add("toaster-close");
  toasterClose.innerHTML = `<span class="material-symbols-outlined">
close
</span>`;

  toaster.appendChild(toasterClose);
  toasterContainer.appendChild(toaster);

  toasterClose.addEventListener("click", () => {
    toaster.classList.add("toaster-exit");
    setTimeout(() => {
      toaster.remove();
    }, 300);
  });

  setTimeout(() => {
    toaster.classList.add("toaster-exit");
    setTimeout(() => {
      toaster.remove();
    }, 300);
  }, duration);
}
