// Backbone view for stock information
var StockView = Backbone.View.extend({


  divText: _.template('\
    <div class="info-item">\
      <h2><%= symbol %></h2>\
        <ul>\
          <li> Initial Value : $<%= amount.toFixed(0) %></li>\
          <li> Final Value : $<%= final.toFixed(2) %></li>\
          <li> Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</li>\
          <span><i class="glyphicon glyphicon-remove"></i></span>\
        </ul>\
    </div>\
  '),

  template: _.template('\
    <span><i class="glyphicon glyphicon-remove"></i></span>\
    <span>Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</span>\
    <span>Final Value : $<%= final.toFixed(2) %></span>\
    <span>Initial Value : $<%= amount.toFixed(0) %></span>\
    <span>Stock : <%= symbol %></span>\
    '),

  initialize: function() {
    var stock = this.model;
    this.$el.on('click', 'i', function () {
      stock.trigger('clicked', stock);
    });
  },


  render: function() {
    return this.$el.html(this.divText(
      _.extend(this.model.attributes, {
      'final': this.model.getEndVal(), 
      'percentage': Math.round(((this.model.getEndVal()/this.model.getStartVal()) - 1)*100)
      })
    ));
  }

});
