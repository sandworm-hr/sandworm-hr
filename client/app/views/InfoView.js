// Backbone view for stock information
var InfoView = Backbone.View.extend({

  className: 'info info-view col-md-5 text-center',

  divText: _.template('\
    <div class="info-item">\
      <h2>Total</h2>\
        <ul>\
          <li> Portfolio Initial Value : $<%= start.toFixed(0) %></li>\
          <li> Portfolio Final Value : $<%= end.toFixed(2) %></li>\
          <li> Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</li>\
        </ul>\
    </div>\
  '),

  template: _.template('<div>\
    <span>Change: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</span>\
    <span> Portfolio Final Value : $<%= end.toFixed(2) %></span>\
    <span> Portfolio Initial Value : $<%= start.toFixed(0) %></span>\
    </div> '),

  initialize: function() {
    this.collection.on('sync edited remove', this.render, this);
  },

  render: function() {
    this.$el.children().empty();
    var $header = $('<h1>Summary</h1><div class="stock-views-container"></div>');
    if (this.collection.length > 0) {
      var port = {};
      port.start = 0;
      port.end = 0;
      // $header.find('.stock-views-container').append(
        var stocks = this.collection.map(function(item) {
          port.start += item.get('amount');
          port.end += item.getEndVal();
          return new StockView({model: item}).render();
        });
      // );
      port.percentage = Math.round((port.end/port.start - 1) * 100);
      // this.$el.append(this.template(port));
    }
    console.log(port);
    this.$el.append($header);
    debugger;
    $header.find('.stock-views-container').append(this.divText(port));
    $header.find('.stock-views-container').append(stocks);
  }

});
