// Backbone view for the stock submission form
var FormView = Backbone.View.extend({

  className: 'form',
  
  initialize: function(){
    this.render();
    //stop loading spinner on page load
    this.stopSpinner(); 
    //stop spinner upon request completion
    this.collection.on('sync', this.stopSpinner, this); 
  },

  events: {
    //Form submission form
    'submit': 'handleSubmit'
  },

  handleSubmit: function(e) {
    e.preventDefault();
    //start spinner upon stock creation
    this.startSpinner(); 
    var d = new Date();
    /* Create will create a new stock in the collection
       and send a request for the pertinent information */
    this.collection.create({
      symbol: this.$('#symbol').val(),
      from: this.$('#date').val(),
      amount: this.$('#amount').val(),
      to: d.toISOString().slice(0,10), //Just the YYYY-MM-DD portion
    });
    this.$('#symbol').val('');
    this.$('#amount').val('');
  },
  
  startSpinner: function(){
    this.$('img').show();
  },

  stopSpinner: function(){
    this.$('img').hide();;
  },


  render: function(){
    //Render main form
    return this.$el.html('\
      <form>\
        <input type="text" id="symbol"><span>Stock Symbol:</span>\
        <input type="date" id="date"><span>Date:</span>\
        <input type="text" id="amount"><span>Amount ($)</span>\
        <input type="submit"/><img src="assets/images/loader.gif">\
      </form>');
  }

});
