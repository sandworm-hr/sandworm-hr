// Backbone view for stock information
var StockView = Backbone.View.extend({


  template: _.template('<div>\
    <span>Stock : <%= symbol %></span>\
    <span>Initial Value : <%= amount %></span>\
    <span>Final Value : <%= final %></span>\
    <span>Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</span>\
    </div> '),


  render: function() {
    return this.$el.html(this.template(
      _.extend(this.model.attributes, {
      'final': this.model.getEndVal(), 
      'percentage': Math.round(((this.model.getEndVal()/this.model.getStartVal()) - 1)*100)
      })
    ));
  }

});
