// Backbone view for stock information
var InfoView = Backbone.View.extend({

  className: 'info',

  template: _.template('<div>\
    <span> Portfolio Initial Value : <%= start %></span>\
    <span> Portfolio Final Value : <%= end %></span>\
    <span>Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</span>\
    </div> '),

  initialize: function() {
    this.collection.on('sync', this.render, this);
  },

  render: function() {
    this.$el.children().detach();
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

});
