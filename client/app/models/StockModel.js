// Backbone model for stocks
var StockModel = Backbone.Model.extend({

  url: '/api/stocks',

  initialize: function(){

  },

  /* given an index or date, returns the value of user's stock at that time
  * using the stock's closing value as the value for that day
  */
  getValue: function(indexOrDate) {
    var history = this.get('history');
    if (typeof indexOrDate === number) {
      return history[indexOrDate].close * (this.get('amount') / this.getStartVal()); // scaling factor
    } else {
      var snapshot = _.findWhere(history, {date: indexOrDate});
      if (!snapshot) {
        return null;
      } else {
        return snapshot.close * (this.get('amount') / this.getStartVal());
      }
    }
  },

  // may not be needed
  getStartDate: function() {
    return this.get('history')[0].date;
  },

  // the last date for which we have data (should be close to now)
  getEndDate: function() {
    var history = this.get('history');
    return history[history.length - 1].date;
  },

  // the value of the stock at purchase time
  getStartVal: function() {
    return this.getValue(1);
  },

  // the value of the stock at the end of the trajectory
  getEndVal: function() {
    return this.getValue(this.get('history').length - 1);
  },

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
