import { Inventory, Storage, UI } from "./classes.js";

const ui = new UI();
const inventoryList = new Inventory();

export const PageState = function () {
  let currentState = new homeState();

  this.init = () => {
    this.change(new homeState);
  }

  this.change = (state) => {
    currentState = state;
  }
};

export const homeState = function (inventory) {
  if (!localStorage.getItem("mart")) {
    Storage.tempInit();
    inventoryList.getInventory();
  }
  ui.init(inventory);

  const home = document.querySelector("#home");

  if(home){
    home.addEventListener('click', (e) => {
      page.change(new homeState());
      e.preventDefault();
    })
  }
};
