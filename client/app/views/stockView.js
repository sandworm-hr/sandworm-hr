// Backbone view for stock information
var StockView = Backbone.View.extend({


  template: _.template('<div>\
    <span><i class="glyphicon glyphicon-remove"></i></span>\
    <span>Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</span>\
    <span>Final Value : $<%= final.toFixed(2) %></span>\
    <span>Initial Value : $<%= amount.toFixed(0) %></span>\
    <span>Stock : <%= symbol %></span>\
    </div> '),

  initialize: function() {
    var stock = this.model;
    this.$el.on('click', 'i', function () {
      stock.trigger('clicked', stock);
    });
  },


  render: function() {
    return this.$el.html(this.template(
      _.extend(this.model.attributes, {
      'final': this.model.getEndVal(), 
      'percentage': Math.round(((this.model.getEndVal()/this.model.getStartVal()) - 1)*100)
      })
    ));
  }

});
