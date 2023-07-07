import { inventoryData } from "./data.js";
import { cartAmount, products } from "./selectors.js";

export class Member {
  constructor(id, firstName, lastName, isMember) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.isMember = isMember;
  }

  updateMemberStatus() {
    this.isMember = !this.isMember;
  }
}

export class Product {
  constructor(id, image, name, quantity, memberPrice, regularPrice, taxable) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.quantity = quantity;
    this.memberPrice = memberPrice;
    this.regularPrice = regularPrice;
    this.taxable = taxable;
  }
}

export class Inventory {
  constructor() {
    this.inventory = Storage.getStorage().inventory;
  }

  getInventory() {
    this.inventory = Storage.getStorage().inventory;
    return this.inventory;
  }

  newProduct(product) {}

  getProductByID(id) {
    return this.inventory.find((product) => product.id === parseInt(id));
  }

  saveProduct(product) {}

  deleteProductByID(id) {}

  static getNewId() {
    this.inventory = Storage.getStorage().inventory;
    if (this.inventory.length) {
      return parseInt(this.inventory[this.inventory.length - 1].id) + 1;
    } else {
      return 1;
    }
  }
}

export class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  addProduct(product) {
    let itemIndex = this.cart.findIndex((item) => product.id === item.id);
    let newProduct = {
      id: product.id,
      image: product.image,
      name: product.name,
      quantity: product.quantity,
      memberPrice: product.memberPrice,
      regularPrice: product.regularPrice,
      taxable: product.taxable,
    };

    if (itemIndex === -1) {
      newProduct.quantity = 1;
      this.cart.push(newProduct);
      Storage.saveCart(this.cart);
    } else {
      this.cart[itemIndex].quantity = this.cart[itemIndex].quantity + 1;
      Storage.saveCart(this.cart);
    }
  }

  removeProductById(productId) {
    const index = this.cart.findIndex((product) => product.id === productId);

    if (index !== -1) {
      this.cart.splice(index, 1);
      Storage.saveCart(this.cart);
    }
  }

  getCart() {
    this.cart = Storage.getStorage().cart;
    return this.cart;
  }

  calculateSubtotal(isMember) {
    let subTotal = 0;
    for (let product of this.cart) {
      if (isMember) {
        subTotal += product.quantity * parseFloat(product.memberPrice);
      } else {
        subTotal += product.quantity * parseFloat(product.regularPrice);
      }
    }
    return subTotal;
  }

  calculateTax(isMember) {
    let tax = 0;
    let taxPercentage = 6.5;
    for (let product of this.cart) {
      if (isMember) {
        if (product.taxable === "Taxable") {
          tax +=
            (product.quantity *
              parseFloat(product.memberPrice) *
              taxPercentage) /
            100;
        }
      } else {
        if (product.taxable === "Taxable") {
          tax +=
            (product.quantity *
              parseFloat(product.regularPrice) *
              taxPercentage) /
            100;
        }
      }
    }
    return tax;
  }

  calculateChange(total, amout) {
    return (amout - total).toFixed(2);
  }

  checkout(isMember, cash) {}
}

export class UI {
  init(inventory) {
    this.setHomePage(inventory);
  }

  setHomePage(inventory) {
    if (inventory) {
      this.setInventory(inventory);
    } else {
      this.setInventory(Storage.getInventory());
    }
    this.updateCartIcon();
  }

  setCartPage(cart, member) {
    let cartList = cart.getCart();
    let output = "";
    let cartSubTotal = cart.calculateSubtotal(member).toFixed(2);
    let cartTax = cart.calculateTax(member).toFixed(2);
    let cartTotal = parseFloat(cartSubTotal) + parseFloat(cartTax);

    if (cartList.length === 0) {
      output = `
        <div>There are no Products</div>
      `;
    } else {
      output = `
      <div class="cart-table">
        <div class="cart-table-header">
          <div class="table-icons">
            <span class="material-symbols-outlined"> delete </span>
          </div>
          <div class="table-name">Name</div>
          <div class="table-quantity fc">Quantity</div>
          <div class="table-price fc">Price</div>
          <div class="table-total fc">Total</div>
        </div>
        <div class="cart-table-body">
      `;
      for (let product of cartList) {
        let price = 0;
        let productTotalPrice = 0;

        if (member) {
          price = parseFloat(product.memberPrice).toFixed(2);
        } else {
          price = parseFloat(product.regularPrice).toFixed(2);
        }

        productTotalPrice = price * product.quantity;

        output += `
          <div class="cart-item">
            <div class="table-icons cart-item-buttons">
              <span class="material-symbols-outlined delete-btn" data-id="${
                product.id
              }"> delete </span>
            </div>
            <div class="table-name cart-item-name">
              <img src="/assets/images/${product.image}" alt="product" />
              <span class="cart-item-name">${product.name}</span>
            </div>
            <div class="table-quantity">
              <span class="add-quantity-btn quantity-btn material-symbols-outlined"> add_circle </span>
              <span>${product.quantity}</span>
              <span class="remove-quantity-btn quantity-btn material-symbols-outlined">
                do_not_disturb_on
              </span>
            </div>
            <span class="table-price fr">$${parseFloat(price).toFixed(2)}</span>
            <span class="table-total fr">$${parseFloat(
              productTotalPrice
            ).toFixed(2)}</span>
          </div>
      `;
      }

      output += `
      </div>
        <div class="cart-calculation">
          <div class="totals-left">
            <button class="button main-button">Checkout</button>
            <button class="button cancel-button">Cancel Order</button>
          </div>
          <div class="totals-center">
            <div class="total-items">
              <span class="bold">Total Items:</span>
              <span>6</span>
            </div>
          </div>
          <div class="totals-right">
            <div class="sub-total">
              <span class="bold">SUB-TOTAL: </span>
              <span class="fr">$${parseFloat(cartSubTotal).toFixed(2)}</span>
            </div>
            <div class="tax">
              <span class="bold">TAX (6.5%): </span>
              <span class="fr">$${parseFloat(cartTax).toFixed(2)}</span>
            </div>
            <div class="total">
              <span class="bold">TOTAL:</span>
              <span class="fr">$${parseFloat(cartTotal).toFixed(2)}</span>
            </div>
            <div class="cash">
              <span class="bold">CASH: </span>
              <input class="fr" type="number" name="cash" id="cash">
            </div>
            <div class="change">
              <span class="bold">CHANGE: </span>
              <span class="fr">$1.73</span>
            </div>
          </div>
        </div>
      </div>
    `;
    }

    products.innerHTML = output;
  }

  updateCartIcon() {
    let amount = Storage.getCartQuantity();
    console.log(Storage.getCartQuantity());
    if (amount !== 0) {
      cartAmount.style.display = "block";
      cartAmount.innerHTML = Storage.getCartQuantity();
    } else {
      cartAmount.style.display = "none";
    }
  }

  setProductPage(product) {}

  setNewProductPage(product) {}

  setEditProductPage(product) {}

  setInventory(inventory) {
    // insert HTML inventory code here
    let output = "";
    if (inventory.length === 0) {
      output = `
        <div>There are no Products</div>
      `;
    } else {
      for (let product of inventory) {
        output += `
        <div class="product-item">
          <div class="product-image">
            <img src="/assets/images/${product.image}" alt="product" />
          </div>
          <div class="product-details">
            <span class="product-name">${product.name}</span>
            <span class="product-availability"><b>Available:</b> ${product.quantity}</span>
          </div>
          <div class="product-price">
            <span class="member-price">$${product.memberPrice}</span>
            <span class="regular-price">$${product.regularPrice}</span>
            <button class="add-to-cart-btn add-item" data-id="${product.id}"><i class="fa fa-cart-shopping add-item" data-id="${product.id}"></i>Add</button>
          </div>
        </div>
      `;
      }
    }

    products.innerHTML = output;
  }
}

export class Storage {
  constructor() {
    this.storage = localStorage.getItem("mart")
      ? localStorage.getItem("mart")
      : { inventory: [], cart: [] };
  }

  static saveStorage(storage) {
    this.storage = storage;
    localStorage.setItem("mart", JSON.stringify(this.storage));
  }

  static getStorage() {
    this.storage = localStorage.getItem("mart")
      ? JSON.parse(localStorage.getItem("mart"))
      : { inventory: [], cart: [] };
    return this.storage;
  }

  static getInventory() {
    this.storage = localStorage.getItem("mart")
      ? JSON.parse(localStorage.getItem("mart"))
      : { inventory: [] };

    return this.storage.inventory;
  }

  static getCart() {
    this.storage = localStorage.getItem("mart")
      ? JSON.parse(localStorage.getItem("mart"))
      : { cart: [] };

    return this.storage.cart;
  }

  static getCartQuantity() {
    let totalItems = 0;
    for (let item of this.storage.cart) {
      totalItems += item.quantity;
    }
    return totalItems;
  }

  static saveInventory(inventory) {
    this.storage.inventory = inventory;
    this.saveStorage(this.storage);
  }

  static saveCart(cart) {
    this.storage.cart = cart;
    this.saveStorage(this.storage);
  }

  static tempInit() {
    this.storage = {
      inventory: inventoryData.map((product) => {
        return {
          id: product.id,
          image: product.image,
          name: product.name,
          quantity: product.quantity,
          memberPrice: product.memberPrice,
          regularPrice: product.regularPrice,
          taxable: product.taxable,
        };
      }),
      cart: [],
    };
    this.saveStorage(this.storage);
  }
}
