var development = require("./development");
var test = require("./test");
var product = require("./product");

var configs = {
  development: development,
  test: test,
  product: product
};


module.exports = configs[process.env.NODE_ENV || 'development'];