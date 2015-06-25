// Backbone view for stock information
var StockView = Backbone.View.extend({


  divText: _.template('\
    <div class="info-item row">\
      <div class="info-subtitle col-md-2 col-md-offset-1"><%= symbol %></div>\
      <div class="col-md-4 col-md-offset-1">\
        <div class="stock-summary">\
          <div> <strong>Initial Value</strong>: $<%= amount.toFixed(0) %></div>\
          <div> <strong>Final Value</strong>: $<%= final.toFixed(2) %></div>\
          <div> <strong>Change</strong>: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</div>\
        </div>\
      </div>\
      <div class="col-md-2 col-md-offset-1"><i class="glyphicon glyphicon-remove remove-icon"></i></div>\
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
