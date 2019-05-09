const assert = require('chai').assert;
const checkout = require('./../CheckoutCalculations/checkout.js');
const calculations = require('./../CheckoutCalculations/calculations.js');
const database = require('./../Database/database.js');
const { scan, total, scannedItems  } = checkout;
const { getInventoryData, convertToMoney } = calculations;

describe('#Testing Totals', function() {
  describe('SKUs Scanned: atv, atv, atv, vga', function() {
    it('Expected Total: $249.00', function() {
      scan('atv');
      scan('atv');
      scan('atv');
      scan('vga');
      const result = total();
      assert.equal(result, '$249.00');
    });
  });

  describe('SKUs Scanned: atv, ipd, ipd, atv, ipd, ipd, ipd', function() {
    it('Expected Total: $2718.95', function() {
      scan('atv');
      scan('ipd');
      scan('ipd');
      scan('atv');
      scan('ipd');
      scan('ipd');
      scan('ipd');
      const result = total();
      assert.equal(result, '$2,718.95');
    });
  });

  describe('SKUs Scanned: mbp, vga, ipd', function() {
    it('Expected Total: $1,949.98', function() {
      scan('mbp');
      scan('vga');
      scan('ipd');
      const result = total();
      assert.equal(result, '$1,949.98');
    });
  });

  describe('SKUs Scanned: mbp, mbp, mbp, vga', function() {
    it('Expected Total: $4,199.97', function() {
      scan('mbp');
      scan('mbp');
      scan('mbp');
      scan('vga');
      const result = total();
      assert.equal(result, '$4,199.97');
    });
  });

  describe('SKUs Scanned: mbp, mbp, mbp, vga, mbp, mbp, vga', function() {
    it('Expected Total: $6,999.95, with two bundled VGAs', function() {
      scan('mbp');
      scan('mbp');
      scan('mbp');
      scan('vga');
      scan('mbp');
      scan('mbp');
      scan('vga');
      const result = total();
      assert.equal(result, '$6,999.95');
    });
  });

  describe('SKUs Scanned: mbp, mbp, mbp, vga, mbp, mbp, mbp, vga', function() {
    it('Expected Total: $8,399.94, with two bundled VGAs', function() {
      scan('mbp');
      scan('mbp');
      scan('mbp');
      scan('vga');
      scan('mbp');
      scan('mbp');
      scan('mbp');
      scan('vga');
      const result = total();
      assert.equal(result, '$8,399.94');
    });
  });
});

describe('#Testing Functionality', function() {
  describe('Testing that items are scanned', function(){
    it("Items added to an array is ['mbp', 'mbp', 'vga']", function() {
      scan('mbp');
      scan('mbp');
      scan('vga');
      assert.deepEqual(scannedItems, ['mbp', 'mbp', 'vga'])
      scannedItems.length = 0;
    });
  });

  describe('Testing getInventoryData', function(){
    it("items should be calculated by amount, and put in database format", function() {
      const items = [ 'mbp', 'mbp', 'mbp', 'vga', 'mbp', 'mbp', 'vga' ]
      const result = getInventoryData(items);
      assert.deepEqual(result, [ { SKU: 'mbp', name: 'Macbook Pro', price: 1399.99, quantity: 5 },
  { SKU: 'vga', name: 'VGA adapter', price: 30, quantity: 2 } ])
    });

  describe('Testing convert to money', function(){
    it("From 15876.765 to $15,876.76", function() {
      const result = convertToMoney(15876.765)
      assert.equal(result, '$15,876.76')
    });
  });
  });


});
