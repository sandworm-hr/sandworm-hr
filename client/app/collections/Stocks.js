// Backbone Collection for Stocks
var Stocks = Backbone.Collection.extend({

  url: '/api/stocks',

  model: StockModel

});