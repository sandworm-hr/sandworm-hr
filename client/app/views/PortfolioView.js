// Backbone view for portfolio information
var PortfolioView = Backbone.View.extend({


  template: _.template('<div class="info-item row" id="<%=id%>"><%= name %></div>'),


  initialize: function(data) {
    this.data = data.data;
    this.render(this.data);
  },

  events: {
    'click' : 'openPortfolio'
  },

  openPortfolio: function() {
    var id = this.data.id;
    var stocks = this.collection;
    stocks.reset(null);

    $.ajax({
      url: '/stocks',
      type: 'POST',
      data: { 'id': id},
      success: function(data) {
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
