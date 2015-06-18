// Backbone view for the stock submission form
var FormView = Backbone.View.extend({
  
  initialize: function(){
    this.render();
    this.stopSpinner();
    this.collection.on('sync', this.stopSpinner, this);
  },

  events: {
    'submit': function(e) {
      e.preventDefault();
      this.startSpinner();
      var d = new Date();
      this.collection.create({
        symbol: this.$('#symbol').val(),
        from: this.$('#date').val(),
        amount: this.$('#amount').val(),
        to: d.toISOString().slice(0,10),
        period: 'd'
      });
    }
  },

  startSpinner: function(){
    this.$('img').show();
  },

  stopSpinner: function(){
    this.$('img').hide();;
  },


  render: function(){
    return this.$el.html('\
      <form>\
        <input type="text" id="symbol"><span>Stock Symbol:</span>\
        <input type="date" id="date"><span>Date:</span>\
        <input type="text" id="amount"><span>Amount ($)</span>\
        <input type="submit"/><img src="assets/images/loader.gif">\
      </form>');
  }

});
