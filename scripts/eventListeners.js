import { PageState, homeState } from "./PageState.js";
import { Inventory } from "./classes.js";

const page = new PageState();
const inventoryList = new Inventory();

export const homePageListener = (e) => {
  page.change(new homeState(page));
  e.preventDefault();
}

export const linksListener = (e) => {
  e.preventDefault();
  let id = e.target.dataset.id
  console.log(e, id);

  if(id){
    page.change()
  } else {
    page.change(new homeState(inventoryList.getInventory()))
  }
}