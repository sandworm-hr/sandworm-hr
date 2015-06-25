// Backbone model for stocks
var PortfolioModel = Backbone.Model.extend({

  initialize: function(){
    var collection = this.get('collection');
    $.ajax({
      url: '/portfolios',
      type: 'POST',
      data: { 
        name: this.get('name'),
      },
      success: function(res) {
        var stocks = [];
        collection.forEach(function(stock) {
          var data = {};
          data.to = stock.get('to');
          data.from = stock.get('from');
          data.amount = stock.get('amount');
          data.symbol = stock.get('symbol');
          data['portfolios_id'] = res.id;
          $.ajax({
            url:'/stock',
            type:'POST',
            data: data,
            success: function(result) {
              console.log(result);
            }
          });
        });
      },
      error: function(error) {
        console.log(error.responseText);
      }
    });
  }

});
