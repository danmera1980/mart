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
    quantity: parseInt(productObject[1]),
    regularPrice: parseFloat(productObject[2].replace("$", "")).toFixed(2),
    memberPrice: parseFloat(productObject[3].replace("$", "")).toFixed(2),
    taxable: productObject[4],
  };
});

