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

  addProduct(product){
    this.cart.push(product);
    Storage.saveCart(this.cart)
  }

  removeProductById(productId){
    const index = this.cart.findIndex(product => product.id === id)

    if(index !== -1){
      this.cart.splice(index, 1);
      console.log(`Item ${id} removed from cart`);
    } else {
      console.log(`Item ${id} not found in the cart`);
    }
  }

  viewCart(){
    if(this.cart.length === 0){
      console.log('The cart is empty');
    } else {
      console.log();
    }
  }

  calculateSubtotal(isMember){}

  calculateTax(isMember){}

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
  }

  setCartPage(cart){
    let output = "";
    console.log(cart.cart);

    if (cart.length === 0) {
      output = `
        <div>There are no Products</div>
      `;
    } else {
      for (let product of cart) {
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
            <button class="add-to-cart-btn" data-id="${product.id}"><i class="fa fa-cart-shopping" data-id="${product.id}"></i>Add</button>
          </div>
        </div>
      `;
      }
    }

    products.innerHTML = output;
  }

  setProductPage(product) {}

  setNewProductPage(product) {}

  setEditProductPage(product) {}

  setInventory(inventory) {
    // insert HTML inventory code here
    let output = "";
    if(inventory.length === 0){
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
            <button class="add-to-cart-btn" data-id="${product.id}"><i class="fa fa-cart-shopping" data-id="${product.id}"></i>Add</button>
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
