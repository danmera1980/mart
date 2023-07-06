import { inventoryData } from "./data.js";
import { products } from "./selectors.js";
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

  getProductByID(id) {}

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
  }

  setProductPage(product) {}

  setNewProductPage(product) {}

  setEditProductPage(product) {}

  setInventory(inventory) {
    // insert HTML inventory code here
    let output = "";

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
          <button><i class="fa fa-cart-shopping"></i>Add</button>
        </div>
      </div>
    `;
    }

    products.innerHTML = output;
  }
}

export class Storage {
  constructor() {
    this.storage = localStorage.getItem("mart")
      ? localStorage.getItem("mart")
      : { inventory: [] };
  }

  static saveStorage(storage) {
    this.storage = storage;
    localStorage.setItem("mart", JSON.stringify(this.storage));
  }

  static getStorage() {
    this.storage = localStorage.getItem("mart")
      ? JSON.parse(localStorage.getItem("mart"))
      : { inventory: [] };
    return this.storage;
  }

  static getInventory() {
    this.storage = localStorage.getItem("mart")
      ? JSON.parse(localStorage.getItem("mart"))
      : { inventory: [] };

    return this.storage.inventory;
  }

  static saveInventory(inventory) {
    this.storage.inventory = inventory;
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
    };
    this.saveStorage(this.storage);
  }
}
