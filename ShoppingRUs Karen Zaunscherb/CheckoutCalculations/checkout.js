const calculations = require('./calculations.js');
const { calculate } = calculations;

const scannedItems = [];

const scan = (item) => scannedItems.push(item);
const total = () => {
  const total = calculate(scannedItems);
  scannedItems.length = 0;
  console.log(total);
  return total;
  }


module.exports = {
  scan,
  total,
  scannedItems,
}