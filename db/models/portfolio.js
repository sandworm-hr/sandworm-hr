var db = require('../config');

var Portfolio = db.Model.extend({
  tableName: 'portfolios',
  hasTimestamps: true,
  user: function() {
    return this.belongsTo(User, 'user_id');
  },
  stocks: function () {
    return this.hasMany(Stock);
  }
});

module.exports = Portfolio;
