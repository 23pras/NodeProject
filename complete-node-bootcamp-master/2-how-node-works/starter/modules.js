// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports one way to export

const C = require("./test-module-1");

const cal1 = new C();

console.log(cal1.add(4, 5));

// export another way to export

const cal2 = require("./test-module-2");
console.log(cal2.multiply(8, 8));

// using destructing

const { add, multiply, divide } = require("./test-module-2");
console.log(multiply(8, 8));

// caching
require("./test-module-3")();
require("./test-module-3")();
require("./test-module-3")();
