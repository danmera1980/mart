import { Inventory, ShoppingCart, Storage, UI } from "./classes.js";
import { heroSection, productsTitle } from "./selectors.js";

const ui = new UI();
const inventoryList = new Inventory();
const cartList = new ShoppingCart();

export const PageState = function () {
  let currentState = new homeState();

  this.init = () => {
    this.change(new homeState());
  };

  this.change = (state) => {
    currentState = state;
  };
};

export const homeState = function (inventory) {
  const home = document.querySelector("#home");

  if (!localStorage.getItem("mart")) {
    Storage.tempInit();
    inventoryList.getInventory();
  }
  ui.init(inventory);
  heroSection.style.display = "flex";
  productsTitle.innerHTML = "Products";

  if (home) {
    home.addEventListener("click", (e) => {
      page.change(new homeState());
      e.preventDefault();
    });
  }
};

export const cartState = function (cart) {
  heroSection.style.display = "none";
  productsTitle.innerHTML = "Your Cart";
  ui.setCartPage(cart);
};
