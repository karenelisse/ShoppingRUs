const databaseInfo = require('./../Database/database.js');
const { deals, inventory } = databaseInfo;

const calculateExactDiscount = (item, deal) => {
    const numberOfItemsDiscounted = ~~(item.quantity / deal.exactQty) * deal.exactQty;
    const numberOfItemsNotDiscounted = item.quantity - numberOfItemsDiscounted;
    return (numberOfItemsDiscounted * item.price * deal.discount) + (numberOfItemsNotDiscounted * item.price); 
}

const calculateMoreThanDiscount = (item, deal) => item.quantity * item.price * deal.discount;

const calculateExactUpdatedPrice = (item, deal) => {
    const numberOfItemsDiscounted = ~~(item.quantity / deal.exactQty) * deal.exactQty;
    const numberOfItemsNotDiscounted = item.quantity - numberOfItemsDiscounted;
    return (numberOfItemsDiscounted * deal.updatedPricePerUnit) + (numberOfItemsNotDiscounted * item.price);   
}

const calculateMoreThanUpdatedPrice = (item, deal) => item.quantity * deal.updatedPricePerUnit; 

const calculateExactAddOn = (item, deal, itemsFromInventory) => {
    const numberOfAddOnsAllowed = ~~(item.quantity / deal.exactQty);
    const costOfItems = item.price * item.quantity;
    const addOn = itemsFromInventory.find(itemFromInventory => itemFromInventory.SKU === deal.addOnSku);
    if(addOn && (numberOfAddOnsAllowed == addOn.quantity)){
      const addOnUpdatedPrice = addOn.quantity * (deal.addOnCost - addOn.price);
      return costOfItems + addOnUpdatedPrice;
    } 
      else if(addOn && (numberOfAddOnsAllowed > addOn.quantity)){
      const numberOfAdditionalAddOns = numberOfAddOnsAllowed - addOn.quantity
      console.log(`You could add on ${numberOfAdditionalAddOns} additional ${addOn.name}(s)`)
      const addOnUpdatedPrice = addOn.quantity * (deal.addOnCost - addOn.price);
      return costOfItems + addOnUpdatedPrice;
    } 
    console.log(`Oops! Don't forget your deal of adding on: ${deal.addOnQty} of ${deal.addOnSku} at $${deal.addOnCost} for every ${deal.exactQty} ${deal.SKU}`);
    return costOfItems;
}

module.exports = {
  calculateExactDiscount,
  calculateMoreThanDiscount,
  calculateExactUpdatedPrice,
  calculateMoreThanUpdatedPrice,
  calculateExactAddOn,
}