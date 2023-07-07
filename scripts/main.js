import { cartListener, changeMemberListener, deleteListener, linksListener } from "./eventListeners.js";
import { cartIcon, isMember, logoIcon, products } from "./selectors.js";

logoIcon.addEventListener("click", linksListener);
products.addEventListener("click", linksListener);
cartIcon.addEventListener("click", cartListener);
isMember.addEventListener("click", changeMemberListener);