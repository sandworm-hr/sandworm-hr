var db = require('../config');

var Stock = db.Model.extend({
  tableName: 'stocks',
  hasTimestamps: true,
  portfolio: function() {
    return this.belongsTo(Portfolio, 'portfolio_id');
  },
});

module.exports = Stock;
