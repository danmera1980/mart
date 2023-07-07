import { PageState, cartState, homeState, user } from "./PageState.js";
import { Inventory, ShoppingCart, UI } from "./classes.js";
import { isMember } from "./selectors.js";
import { createToaster } from "./toaster.js";

const page = new PageState();
const inventoryList = new Inventory();
const cartList = new ShoppingCart();
const ui = new UI();

let member = isMember.checked;

export const homePageListener = (e) => {
  e.preventDefault();
  page.change(new homeState(page));
};

export const linksListener = (e) => {
  e.preventDefault();
  let tempProduct;
  let tempList;
  let id = e.target.dataset.id;
  if (
    e.target.hasAttribute("data-id") &&
    e.target.classList.contains("add-item")
  ) {
    if (id) {
      tempProduct = inventoryList.getProductByID(id);
      cartList.addProduct(tempProduct);
      createToaster("Item added to the cart", 3000);
      ui.updateCartIcon();
    } else {
      page.change(new homeState(inventoryList.getInventory()));
    }
  } else if (e.target.classList.contains("homeLink")) {
    page.change(new homeState(inventoryList.getInventory()));
  } else if (e.target.classList.contains("delete-btn")) {
    let deleteId = parseInt(e.target.dataset.id);
    cartList.removeProductById(deleteId);
    createToaster('Item Removed from the cart', 3000, 'danger')
    page.change(new cartState(cartList, member));
  }
};

export const cartListener = () => {
  page.change(new cartState(cartList, member));
};

export const changeMemberListener = () => {
  user.updateMemberStatus();
  member = user.isMember;
};

export const deleteListener = (e) => {
  console.log(e.target.dataset);
};
