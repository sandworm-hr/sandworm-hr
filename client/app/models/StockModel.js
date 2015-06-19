// Backbone model for stocks
var StockModel = Backbone.Model.extend({

  url: '/api/stocks',

  initialize: function(){
  },

  parse: function(response) {
    this.set('history', response);
    this.set('amount', parseFloat(this.get('amount')));
    this.set('nShares', this.get('amount') / this.get('history')[0].close);
  },

  /* given an index or date, returns the value of user's stock at that time
  * using the stock's closing value as the value for that day
  */
  getValue: function(indexOrDate) {
    var history = this.get('history');
    if (typeof indexOrDate === number) {
      return history[indexOrDate].close * this.get('nShares'); // scaling factor
    } else {
      var snapshot = _.findWhere(history, {date: indexOrDate});
      if (!snapshot) {
        return null;
      } else {
        return snapshot.close * this.get('nShares');
      }
    }
  },

  // may not be needed
  getStartDate: function() {
    return new Date(this.get('history')[0].date);
  },

  // the last date for which we have data (should be close to now)
  getEndDate: function() {
    var history = this.get('history');
    return new Date(history[history.length - 1].date);
  },

  // the value of the stock at purchase time
  getStartVal: function() {
    return this.get('amount');
  },

  // the value of the stock at the end of the trajectory
  getEndVal: function() {
    return this.getValue(this.get('history').length - 1);
  },

  // returns the stock's history in d3-consumable format
  getTrajectory: function() {
    var context = this;
    return _.map(this.get('history'), function(snapshot, index) {
      var values = {};
      values.date = new Date(snapshot.date);
      values.value = context.getValue(index);
      values.symbol = snapshot.symbol;
      return values;
    });
  },


});
