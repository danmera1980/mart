export let inventoryData;

async function fetchInventory() {
  const response = await fetch("/assets/data/inventory.txt");
  const products = await response.text();
  inventoryData = products.split("\n");
  return inventoryData;
}

let tempInventoryData = await fetchInventory();

inventoryData = tempInventoryData.map((product, index) => {
  let productObject = product.split(/, |: /);
  return {
    id: index + 1,
    image: `${productObject[0].toLowerCase()}.jpg`,
    name: productObject[0],
    quantity: productObject[1],
    memberPrice: productObject[2],
    regularPrice: productObject[3],
    taxable: productObject[4],
  };
});

