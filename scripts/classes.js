export class Product {
  constructor(id, image, name, memberPrice, regularPrice, taxable) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.memberPrice = memberPrice;
    this.regularPrice = regularPrice;
    this.taxable = taxable;
  }
}

export class Inventory {
  constructor() {
    this.inventory = Storage.getStorage().inventory;
  }

  getInventory() {}

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
    if(inventory){
      this.setInventory(inventory)
    } else {
      this.setInventory(Storage.getInventory())
    }
  }

  setProductPage(product) {}

  setNewProductPage(product) {}

  setEditProductPage(product) {}

  setInventory(inventory) {}
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
      inventory: inventory.map((product) => {
        return {
          id: product.id,
          image: product.image,
          name: product.name,
          memberPrice: product.memberPrice,
          regularPrice: product.regularPrice,
          taxable: product.taxable,
        };
      }),
    };
    this.saveStorage(this.storage);
  }
}
