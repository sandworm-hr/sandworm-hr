var db = require('../config');
var Stock = require('../models/stock');

var Stocks = new db.Collection();

Stocks.model = Stock;

module.exports = Stocks;
