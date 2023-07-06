import { PageState, cartState, homeState } from "./PageState.js";
import { Inventory, ShoppingCart } from "./classes.js";

const page = new PageState();
const inventoryList = new Inventory();
const cartList = new ShoppingCart();

export const homePageListener = (e) => {
  page.change(new homeState(page));
  e.preventDefault();
}

export const linksListener = (e) => {
  e.preventDefault();
  let id = e.target.dataset.id

  if(id){
    let tempProduct = inventoryList.getProductByID(id);
    cartList.addProduct(tempProduct);
    console.log(cartList);
  } else {
    page.change(new homeState(inventoryList.getInventory()))
  }
}

export const cartListener = () => {
  page.change(new cartState(cartList.cart))
}