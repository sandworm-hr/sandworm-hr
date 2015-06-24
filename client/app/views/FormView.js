// Backbone view for the stock submission form
var FormView = Backbone.View.extend({

  className: 'form container',

  divText: '\
      <div class="container"> \
        <div class="row"> \
          <div class="col-md-6 col-md-offset-3 well text-center">\
            <form role="form">\
              <div class="form-group"> \
                <label for="symbol">Stock Symbol</label>\
                <input type="text" id="symbol" class="form-control">\
              </div> \
              <div class="form-group"> \
                <label for="date">Date</label>\
                <input type="date" id="date" class="form-control">\
              </div> \
              <div class="form-group"> \
                 <label for="date">Amount ($)</label>\
                 <input type="text" id="amount" class="form-control">\
              </div> \
              <button type="submit" class="btn btn-default">Submit</button>\
              <img src="assets/images/loader.gif">\
            </form>\
          </div> \
        </div> \
      </div>',

  pickStockEl: '<div class="form-group text-center">\
                  <label for="symbol">Pick a Stock</label>\
                  <input type="text" id="symbol" class="form-control">\
                </div>',

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
    return this.$el.html(this.divText);
  }

});
