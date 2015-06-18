// Backbone view for the stock submission form
var FormView = Backbone.View.extend({

  initialize: function(){
    this.render();
  },

  render: function(){
    return this.$el.html('\
      <form>\
        <input><span>Stock Symbol:</span>\
        <input/><span>Date:</span>\
        <input/><span>Amount ($)</span>\
        <input type="submit"/>\
      </form>');
  }

});
