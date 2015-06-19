// Backbone view for stock information
var StockView = Backbone.View.extend({


  template: _.template('<div><span>Stock : <%= symbol %></span><span>Initial Value : <%= amount %></span></div> '),


  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }

});
