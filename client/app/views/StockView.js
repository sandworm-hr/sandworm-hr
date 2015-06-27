// Backbone view for stock information
var StockView = Backbone.View.extend({

  template: _.template('\
     <div class="info-item row">\
       <div class="info-subtitle col-md-2 col-md-offset-1"><%= symbol %></div>\
       <div class="col-md-5 col-md-offset-1">\
         <div class="stock-summary">\
           <div class="info-stat"> <strong>Initial Value</strong>: $<%= this.numberWithCommas(amount.toFixed(0)) %></div>\
           <div class="info-stat"> <strong>Final Value</strong>: $<%= this.numberWithCommas(final.toFixed(2)) %></div>\
         </div>\
       </div>\
       <div class="trend-stats col-md-2">\
         <i class="glyphicon glyphicon-arrow-<% if (percentage >= 0) { %>up up-icon<% } else { %>down down-icon<% } %>"></i><%= this.numberWithCommas(Math.abs(percentage)) %>%\
       </div>\
      <div class="col-md-1"><i class="glyphicon glyphicon-remove remove-icon"></i></div>\
    </div>'),


  initialize: function() {
    var stock = this.model;
    this.$el.on('click', 'i', function () {
      stock.trigger('clicked', stock);
    });
  },

  numberWithCommas: function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
