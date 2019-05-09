
const Mocha = require('mocha');
const mocha = new Mocha();

mocha.addFile('Test/assertTests.js');
const failures = new Promise((resolve) => mocha.run(resolve));