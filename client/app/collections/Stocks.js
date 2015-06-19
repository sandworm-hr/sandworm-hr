// Backbone Collection for Stocks
var Stocks = Backbone.Collection.extend({

  url: '/api/stocks',

  model: StockModel,

  // returns the latest date associated with any stock in the collection (shoud be close to now)
  getMaxDate: function() {
    return this.max(function(stock) {
      return stock.getMaxDate();
    });
  },

  // returns the earliest date associated with any stock in the collection
  getMinDate: function() {
    return this.min(function(stock) {
      return stock.getMinDate();
    });
  },

  // returns an array of arrays where yet-unbought stocks are backfilled with value = 0
  normalizeStocks: function() {
   
  },

  // returns a single array representing the performance of all stocks between the global max and min dates
  addStocks: function() {

  }

});