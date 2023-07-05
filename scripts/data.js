export let items;

async function fetchInventory() {
  const response = await fetch("/data/inventory.txt");
  const products = await response.text();
  items = products.split("\n");
  return items;
}

items = await fetchInventory()