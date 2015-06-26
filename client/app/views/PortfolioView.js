// Backbone view for portfolio information
var PortfolioView = Backbone.View.extend({


  template: _.template('<div class="info-item row" id="<%=id%>"><%= name %></div>'),


  initialize: function(data) {
    this.render(data);
  },

  events: {
    'click' : 'openPortfolio'
  },

  openPortfolio: function() {
    var id = this.id;

    $.ajax({
      url: '/stocks',
      type: 'POST',
      data: { 'id': id},
      success: function(data) {
        console.log(data);
      }
    });

  },

  render: function(data) {
      this.$el.html(this.template(data));
  }

});
