// Backbone Collection for Stocks
var Stocks = Backbone.Collection.extend({

  url: '/api/stocks',

  model: StockModel,

  // returns the latest date associated with any stock in the collection (shoud be roughly today)
  // note that "stocks" is a part of the variable name to avoid confusion with model methods
  getStocksMaxDate: function() {
    return this._getMaxStockTraj.getEndDate();
  },

  // returns the earliest date associated with any stock in the collection
  getStocksMinDate: function() {
    return this._getMinStockTraj.getStartDate();
  },

  // returns trajectory for the stock that was purchased at the earliest date
  _getMinStockTraj: function() {
   var minStock = this.min(function(stock) {
      return stock.getStartDate();
    });
   return minStock.getTrajectory();
  },

  // returns trajectory for the stock with the latest end date (usually now)
  _getMaxStockTraj: function() {
    var maxStock = this.max(function(stock) {
      return stock.getEndDate();
    });
    return maxStock.getTrajectory();
  },

  // helper function to return a back-filled trajectory for a stock
  // TO DO: make more robust to non-overlapping first and last stocks
  _normalizeStock: function(stock) {
    var earliestStock = this._getMinStockTraj();
    var latestStock = this._getMaxStockTraj();
    var traj = stock.getTrajectory();
    var earlyFill = [];
    var lateFill = [];


    // creates an array of zero values to front-pad
    _.each(earliestStock, function(snapshot) {
      if (snapshot.date < stock.getStartDate()) {
        earlyFill.push({
          value: 0,
          date: snapshot.date,
          symbol: snapshot.symbol
        });
      }
    });

    // creates an array of zero values to back-pad
    _.each(latestStock, function(snapshot) {
      if (snapshot.date > stock.getEndDate()) {
        lateFill.push({
          value: 0,
          date: snapshot.date,
          symbol: snapshot.symbol
        });
      }
    });

    // finally, concatenates and returns
    return earlyFill.concat(traj, lateFill);
  },

  // returns an array of trajectory arrays where yet-unbought stocks are backfilled with value = 0
  normalizeStocks: function() {
    var context = this;
    return this.map(function(stock) {
      return context._normalizeStock(stock);
    });
  },

  // returns a single array representing the average performance of all stocks between the global max and min dates
  getAverage: function() {

    var normalized = this.normalizeStocks();
    var stockRange = _.range(this.length);
    var timeRange = _.range(normalized[0].length);

    // for each time point in our range ...
    return _.map(timeRange, function(timeIndex) {
      var aggregated = {};
      var divisor = 0;
      for (var i = 0; i < normalized.length; i++) {
        if (normalized[i][timeIndex].value !== 0) {
          divisor++;
        }
      }
      // add up and average the value over all the stocks in the collection
      aggregated.value = (1 / divisor) * _.reduce(stockRange, function(total, stockIndex) {
          return total + normalized[stockIndex][timeIndex].value;
        }, 0);

      // to keep the same trajectory format, add date and "symbol" indicating that this is an aggregate
      aggregated.date = normalized[0][timeIndex].date;
      aggregated.symbol = 'all';
      return aggregated;
    });
  }

});
