const inventory = [{
  SKU: 'ipd',
  name: 'Super iPad',
  price: 549.99
},
{
  SKU: 'mbp',
  name: 'Macbook Pro',
  price: 1399.99
},
{
  SKU: 'atv',
  name: 'Apple TV',
  price: 109.50
},
{
  SKU: 'vga',
  name: 'VGA adapter',
  price: 30.00
}];

const deals = [
  {
    SKU: 'atv',
    type: 'exactDiscount',
    exactQty: 3,
    moreThanQty: null,
    updatedPricePerUnit: null,
    discount: .666666667,
    addOnSku: null,
    addOnQty: null,
    addOnCost: null,
  },
  {
    SKU: 'ipd',
    type: 'moreThanUpdatedPrice',
    exactQty: null,
    moreThanQty: 4,
    updatedPricePerUnit: 499.99,
    discount: null,
    addOnSku: null,
    addOnQty: null,
    addOnCost: null,
  },
  {
    SKU: 'mbp',
    type: 'exactAddOn',
    exactQty: 1,
    moreThanQty: null,
    updatedPricePerUnit: null,
    discount: null,
    addOnSku: 'vga',
    addOnQty: 1,
    addOnCost: 0,
  }
];

module.exports = {
  inventory,
  deals
}






