// Backbone view for portfolios information
var PortfoliosView = Backbone.View.extend({

  className: 'container stock-views-container',

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
    var headerText = '<h1 class="info-view-title text-center">My Portfolios</h1>';
    this.$el.html(headerText);
    for (var i = 0; i < list.length; i++) {
      this.$el.append(new PortfolioView({collection: this.collection}, list[i]).$el);
    }
  }

});
