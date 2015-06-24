// Backbone view for stock information
var InfoView = Backbone.View.extend({

  className: 'info',

  template: _.template('<div>\
    <span>Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</span>\
    <span> Portfolio Final Value : $<%= end.toFixed(2) %></span>\
    <span> Portfolio Initial Value : $<%= start.toFixed(0) %></span>\
    </div> '),

  initialize: function() {
    this.collection.on('sync', this.render, this);
    this.collection.on('remove', this.render, this);
  },

  render: function() {
    this.$el.children().empty();
    if (this.collection.length > 0) {
      var port = {};
      port.start = 0;
      port.end = 0;
      this.$el.append(
        this.collection.map(function(item) {
          port.start += item.get('amount');
          port.end += item.getEndVal();
          return new StockView({model: item}).render();
        })
      );
      port.percentage = Math.round((port.end/port.start - 1) * 100);
      this.$el.append(this.template(port));
    }
  }

});
