// Backbone view for stock information
var InfoView = Backbone.View.extend({

  className: 'info',

  initialize: function() {
    this.collection.on('add remove', this.render, this)
  },

  render: function() {
    this.$el.children().detach();
    this.$el.append(
      this.collection.map(function(item) {
        return new StockView({model: item}).render();
      })
    );
  }

});
