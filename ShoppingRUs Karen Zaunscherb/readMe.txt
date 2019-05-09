Created By: Karen Zaunscherb
May 2019
email: karenelisse@gmail.com

This application was built for ShoppingRUs, a computer store. It is designed to handle an inventory, as well as simple-to-change rules on pricing and discounts. 
The program is written in Javascript, specifically Node.js. No additional frameworks were added, with the exception of Mocha and Chai for testing purposes. 

Due to the requirements, there is not a UI or a command line to run the program. 
Instead, directions for running can be seen below. 

### Background

 | ipd | Super iPad | $549.99 |
 | mbp | MacBook Pro | $1399.99 |
 | atv | Apple TV | $109.50 |
 | vga | VGA adapter | $30.00

The application is built with the above table for pricing. Pricing needed to be able to be updated quickly, as well as to be able to have discounts applied:

*3 for 2 deal on Apple TVs. For example, if you buy 3 Apple TVs, you will
pay the price of 2 only
*The brand new Super iPad will have a bulk discounted applied, where the price will drop to
$499.99 each, if someone buys more than 4
*We will bundle in a free VGA adapter free of charge with every MacBook Pro sold

### Installation
REQ: Node & npm (npm is for unit testing only)

Download application. Get into terminal. 
npm install mocha
npm install chai

You should then be able to follow the “running” directions in order to change the scanning items, and then, in the terminal, put: 
node index.js

Alternatively, one can utilise Repl.it. Follow the link below to access the code, and "scan" items using the directions, below. 
Then, simply click the “run” button. 

https://repl.it/@karenelisse/ShoppingRUs

### How to "Scan" Items & Run
In order to run this program, one must enter the index.js file. In order to "scan", the user needs to put the scan('SKU'). The user can input as many as they want, and change it to any item in the inventory "database" (or even if it's not in the "database", but it will not be added to the final total). 
To total, use the total() function. There's an example, below:
scan('mbp');
scan('vga');
total();

### Updating Pricing and Discounts

## Pricing
All of the pricing is located in the "database". It's all located in JSON format in an array called "inventory". (See below for future state for database). The price is listed under price and can be updated to a number. 

{
  SKU: 'ipd',
  name: 'Super iPad',
  price: 549.99
},

## Discounts
The discounts are located in the "database". It's all located in JSON format in an array called "deals". (See below for future state for database). 
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

The SKU is based off of the SKUs from the inventory database. That's how it knows which one to apply. There are then 5 different types of discounts which it could be -- exactDiscount, moreThanDiscount, exactUpdatedPrice, moreThanUpdatedPrice, exactAddOn. 

#exactDiscount
The exactDiscount is a percentage which is applied to the price, if it's exactly 3 items (in this example, but the exactQty can be any percentage). This allows flexibility for percentages off, or can be calculated into a percentage off. REQUIRED: type: exactDiscount, exactQty, and discount. If more than the exactQty are selected, it's then in multiples OF that exact quantity (ie, if they have 6 items, all 6 will have the updated price, but if they have 5, only the first three will)
#moreThanDiscount
The moreThanDiscount is a percentage which is applied to the price, if it's moreThan the amount of items selected (in this example, but the exactQty can be any percentage). This allows flexibility for percentages off, or can be calculated into a percentage off. REQUIRED: type: moreThanDiscount, moreThanQty, and discount. If more than the exactQty are selected, it's then in multiples OF that exact quantity (ie, if they have 6 items, all 6 will have the discounted price, but if they have 5, only the first three will)
#exactUpdatedPrice
The exact updated price is an update in the price if you have exactly an amount of items purchased. The updatedPricePerUnit would then be the new price. Applies for exactly that amount or multiples of that amount
#moreThanUpdatedPrice
The more than updated price is an update in the price if you have more than an amount of items purchased. The updatedPricePerUnit would then be the new price. 
#exactAddOn
The exact Add. On is an update of the price IF the additional item has been added on. It can be multiple items, and can be, for example half of the price and does not have to be full price. For example, the vga connector is free if they purchase a MacBook Pro. It does NOT add the missing item on, and if they could have had more, it has an alert that they COULD have added. more.

### Tests
Unit tests are done utilising Mocha and Chai's assert functionalities. The tests test various combinations for totals, with discounts applied and without discounts applied versions. There are also functionality tests, including the convertToMoney function and that items are added to the scanned "array".  These can be seen in the Test/assertTests.js file.
Because of the requirement for no command line UI, I did not add a script for it, and instead added it in as running with nodejs. 

There are two options for running this. 

The first is to modify the index.js file by adding in:
 const test = require('./Test/test.js');
This will work in the terminal as well as in Repl. 

The second is by going into Test from the  root folder of the program, and then running a node call: 
cd Test
node runTests.js

### Flow
index.js is the entry point
Information is then scanned (as many times as required) using the scan() function, and it's totalled using the total() function, both located in CheckoutCalculations/checkout.js file. 

The scan() function adds them to an array.
The total() function uses the calculate function from calculations.js in order to calculate the total.

calculate() calculates the items from the inventory (also located in calculations.js to see how many items from the inventory have been scanned. 
updatePrices() is where it gets sent to calculate the prices withh any discounts, in costs.js file. 

calculateCosts() calls on calculateDiscountPrice() where it refers to discount.js in order to calculate any of the discounts which may be in the "database" in Database/database.js, deals. 

Once that is done, the total is then converted to money and it is then displayed for the user. 

### Future State
These are items which I'd like to focus on at a later time, and additional features I would have liked to have add but didn't have the time or scope to achieve.

## Scanning and Totalling
I don't like that the scanning is just put into an array. I would much prefer if that was in a database, which could be called on at a later time. This is because, in the real world, customers would want to know or be able to see their entire purchase information, and often lose things, so it's good to have that saved somewhere for a reference. I would also like to be able to add WHICH discounts were applied to this, for receipt purposes. 
I would also like to ultimately save the information from the client as well, but that adds an entirely new layer of complexity involving security, which is touched below in Database and Security.

## Front End
Since it was out of scope for this task, there was no UI added. While it works, I definitely would like to have a front end in future state -- not just for the checkout process, but for other areas as well. Even if it was just in the command line to start -- make it interactive for the user. 
I would love to be able to have a secure back end where the user can access a databse in order to update the prices as well as the inventory. This would be a seperate area from the rest, to help with securing it. In order to do this, though, adding a database would also be a requirement (see below for database);

## Database
While this app is functioning, there are many functionalities which I would like to add. The first one being a database. Without adding additional frameworks, while it's possible in Node.JS, it's not ideal without giving up code quality, security, and adding an additional server layer of complexity. Alternatively, one can use an external server for that, for example, using mLabs and mongoDb and access it. It could be accessed via an API, however that is not secure without more complexity added. There's also the issue of NodeJS (specifically https functionality) in being asynchronous, and without an additional framework, making the calls to the API become tedious and messy. In a future state, I would like to use those frameworks (adding my own for security, preferably) and make it secure. 

## Security
This application is NOT secure. Although it does not go to any external sources, the inventory is in the code, and with a slight update can be changed. Also, it's required to change the code in order to actually scan and test, which is not ideal at all. A lot of this could be resolved with the database and a secure front end with a login. 

## Testing
While there are several tests currently, I would love to be able to add more tests in, as, ideally, I would have 100% coverage (or at least 95%) of the code.

## Speed
There are several functions which could and should be optimised and refactored to make it faster. 

## Error handling
While there are a couple of areas which catch errors, I would like to add more, and have proper catches, instead of just a "console.error" output of the error. 





