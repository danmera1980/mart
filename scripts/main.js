import { inventoryData } from "./data.js";
import { linksListener } from "./eventListeners.js";
import { main, products } from "./selectors.js";

main.addEventListener("click", linksListener);
// products.addEventListener("click", linksListener);
