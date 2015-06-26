// Backbone view for portfolios information
var PortfoliosView = Backbone.View.extend({

  className: 'container',

  initialize: function() {
    var context = this;
    $.ajax({
      url: '/portfolios',
      type: 'GET',
      success: function(data) {
        context.render(data);    
      }
    });
  },

  render: function(list) {
    this.$el.children().empty();
    this.delegateEvents();
    var headerText = '<h1 class="info-view-title">Summary</h1><div class="stock-views-container text-left"></div>';
    this.$el.html(headerText);
    for (var i = 0; i < list.length; i++) {
      this.$el.append(new PortfolioView({collection: this.collection, data: list[i]}).$el);
    }
  }

});
