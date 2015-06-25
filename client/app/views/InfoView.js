// Backbone view for stock information
var InfoView = Backbone.View.extend({

  className: 'info info-view col-md-5 text-center',

  // divText: _.template('\
  //   <div class="info-item">\
  //     <h2 class="info-subtitle">Total</h2>\
  //       <ul class="stock-summary">\
  //         <li> <strong>Portfolio Initial Value</strong>: $<%= start.toFixed(0) %></li>\
  //         <li> <strong>Portfolio Final Value</strong>: $<%= end.toFixed(2) %></li>\
  //         <li> <strong>Change</strong>: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</li>\
  //       </ul>\
  //   </div>\
  // '),

  divText: _.template('<div class="info-item row">\
                         <div class="info-subtitle col-md-2 col-md-offset-1">Total</div>\
                         <div class="col-md-4 col-md-offset-1">\
                           <div class="stock-summary">\
                             <div class="info-stat"> <strong>Initial Value</strong>: $<%= start.toFixed(0) %></div>\
                             <div class="info-stat"> <strong>Final Value</strong>: $<%= end.toFixed(2) %></div>\
                           </div>\
                         </div>\
                         <div class="trend-stats col-md-2">\
                           <i class="glyphicon glyphicon-arrow-<% if (percentage >= 0) { %>up up-icon<% } else { %>down down-icon<% } %>"></i><%= Math.abs(percentage) %>%\
                         </div>\
                      </div>'),


  // divText: _.template('\
  //   <div class="info-item row">\
  //     <div class="info-subtitle col-md-2 col-md-offset-1"><%= symbol %></div>\
  //     <div class="col-md-4 col-md-offset-1">\
  //       <div class="stock-summary">\
  //         <div> <strong>Initial Value</strong>: $<%= amount.toFixed(0) %></div>\
  //         <div> <strong>Final Value</strong>: $<%= final.toFixed(2) %></div>\
  //         <div> <strong>Change</strong>: <% if (percentage >= 0) { %> UP <% } else { %> DOWN <% } %> <%= Math.abs(percentage) %>%</div>\
  //       </div>\
  //     </div>\
  //     <div class="col-md-2 col-md-offset-1"><i class="glyphicon glyphicon-remove remove-icon"></i></div>\
  //   </div>\
  // '),

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
    var headerText = '<h1 class="info-view-title">Summary</h1><div class="stock-views-container text-left"></div>';

    if (this.collection.length > 0) {
      var port = {};
      port.start = 0;
      port.end = 0;
      var stocks = this.collection.map(function(item) {
        port.start += item.get('amount');
        port.end += item.getEndVal();
        return new StockView({model: item}).render();
      });
      port.percentage = Math.round((port.end/port.start - 1) * 100);
    }
    this.$el.html(headerText);
    this.$el.find('.stock-views-container').html(this.divText(port));
    this.$el.find('.stock-views-container').append(stocks);
  }

});
