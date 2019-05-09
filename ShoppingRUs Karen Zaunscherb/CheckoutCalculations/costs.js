const databaseInfo = require('./../Database/database.js');
const discounts = require('./discounts.js');
const constants = require('./constants.js');

const { deals, inventory } = databaseInfo;
const { calculateExactDiscount, calculateMoreThanDiscount, calculateExactUpdatedPrice, calculateMoreThanUpdatedPrice, calculateExactAddOn } = discounts;

const calculateDiscountPrice = (item, deal, itemsFromInventory) => {
  let price = item.price * item.quantity;
  if((deal.exactQty && item.quantity >= deal.exactQty) || (deal.moreThanQty && item.quantity >= deal.moreThanQty)) {
    switch(deal.type) {
      case constants.exactDiscount:
        price = calculateExactDiscount(item, deal);
        break;
      case constants.moreThanDiscount:
        price = calculateMoreThanDiscount(item, deal);
        break;
      case constants.exactUpdatedPrice:
        price = calculateExactUpdatedPrice(item, deal);
        break;
      case constants.moreThanUpdatedPrice:
        price = calculateMoreThanUpdatedPrice(item, deal);
        break;
      case constants.exactAddOn:
        price = calculateExactAddOn(item, deal, itemsFromInventory);
        break;
      default:
      price = item.price * item.quantity;
    }
  } 
  return price;
}

const calculateCosts = (itemsFromInventory) => {
  const costs = [];
  itemsFromInventory.forEach(item => {
    const deal = deals.find(deal => deal.SKU === item.SKU);
    if(deal){
      costs.push(calculateDiscountPrice(item, deal, itemsFromInventory))
    }
    else {
      const totalForItem = item.price * item.quantity;
      costs.push(totalForItem);
    }
  });
  return costs;
}

module.exports = {
  calculateCosts,
}