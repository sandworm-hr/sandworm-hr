// Backbone view for portfolio information
var PortfolioView = Backbone.View.extend({


  template: _.template('<div class="info-item row portfolio" id="<%=id%>"><i class="glyphicon glyphicon-folder-open"></i>    <%= name %></div>'),



  initialize: function(options, data) {
    this.data = data;
    this.render(this.data);
  },

  events: {
    'click' : 'openPortfolio'
  },

  openPortfolio: function() {
    var stocks = this.collection;
    stocks.reset(null);
    var id = this.data.id;
    $.ajax({
      url: '/stocks',
      type: 'POST',
      data: {'id': id},
      success: function(data) {
        console.log(data);
        data.forEach(function (stock) {
          stocks.create(stock);
        });
        window.location.hash = 'front';
      }
    });

  },

  render: function(data) {
      this.$el.html(this.template(data));
  }

});
