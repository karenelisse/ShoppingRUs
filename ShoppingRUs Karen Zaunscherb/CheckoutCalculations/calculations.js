const databaseInfo = require('./../Database/database.js');
const costs = require ('./costs.js');
const { inventory } = databaseInfo;
const { calculateCosts } = costs;

const convertToMoney = (value) => value ? `$${parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}` : '$0.00';

const getInventoryData = (items) => {
  const inventoryDataWithQty = [];
  items.forEach(item => {
    const inventoryItem = inventory.find(inventoryData => inventoryData.SKU === item);

    if(inventoryItem){
      const itemPreviouslyScanned = inventoryDataWithQty.find(element => element.SKU === inventoryItem.SKU);

      if(itemPreviouslyScanned){
        itemPreviouslyScanned.quantity += 1;
      }
      else{
        inventoryItem.quantity = 1;
        inventoryDataWithQty.push(inventoryItem)
      }
    }
    else console.error(`ERROR: The item ${item} is not in part of the inventory`); 
  });  
  return inventoryDataWithQty;
}

const calculate = (items) => {
  const itemsFromInventory = getInventoryData(items);
  const updatedPrices = calculateCosts(itemsFromInventory);
  return convertToMoney(updatedPrices.reduce((a,b) => a+ +b, 0));
}

module.exports = {
  calculate,
  getInventoryData,
  convertToMoney,
}