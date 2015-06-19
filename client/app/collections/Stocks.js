// Backbone Collection for Stocks
var Stocks = Backbone.Collection.extend({

  url: '/api/stocks',

  model: StockModel,

  // returns the latest date associated with any stock in the collection (shoud be close to now)
  getMaxDate: function() {
    return this._getMaxStockTraj.getMaxDate();
  },

  // returns the earliest date associated with any stock in the collection
  getMinDate: function() {
    return this._getMinStockTraj.getMinDate();
  },

  // returns trajectory for the stock that was purchased at the earliest date
  _getMinStockTraj: function() {
   return this.min(function(stock) {
      return stock.getMinDate();
    });
  },

  // returns trajectory for the stock with the latest end date (usually now)
  _getMaxStockTraj: function() {
    return this.max(function(stock) {
      return stock.getMaxDate();
    });
  },

  // helper function to return a back-filled trajectory for a stock
  _normalizeStock: function(stock) {
  
  },

  // returns an array of trajectory arrays where yet-unbought stocks are backfilled with value = 0
  normalizeStocks: function() {
   
  },

  // returns a single array representing the performance of all stocks between the global max and min dates
  addStocks: function() {

  }

});