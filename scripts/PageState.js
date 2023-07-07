import { Inventory, Member, ShoppingCart, Storage, UI } from "./classes.js";
import { firstName, heroSection, isMember, lastName, productsTitle } from "./selectors.js";

const ui = new UI();
const inventoryList = new Inventory();
const cartList = new ShoppingCart();
export const user = new Member(1, "John", "Doe", true);

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

  firstName.innerHTML = user.firstName;
  lastName.innerHTML = user.lastName;
  user.isMember ? (isMember.checked = true) : (isMember.checked = false);

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

export const cartState = function (cart, isMember) {
  heroSection.style.display = "none";
  productsTitle.innerHTML = "Your Cart";

  ui.setCartPage(cart, isMember);
};
