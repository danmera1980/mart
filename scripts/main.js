import { cartListener, linksListener } from "./eventListeners.js";
import { cartIcon, item, logoIcon, main, products } from "./selectors.js";

logoIcon.addEventListener("click", linksListener);
products.addEventListener("click", linksListener);
cartIcon.addEventListener("click", cartListener );
