import { cartListener, cashListener, changeMemberListener, linksListener } from "./eventListeners.js";
import { cartIcon, cashInput, isMember, logoIcon, products } from "./selectors.js";

logoIcon.addEventListener("click", linksListener);
products.addEventListener("click", linksListener);
cartIcon.addEventListener("click", cartListener);
isMember.addEventListener("click", changeMemberListener);
products.addEventListener('keyup', cashListener)