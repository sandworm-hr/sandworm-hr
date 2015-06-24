// Backbone view for the stock submission form
var FormView = Backbone.View.extend({

  className: 'form container',

  divText: '\
      <div class="container"> \
        <div class="row"> \
          <div class="col-md-4 col-md-offset-4 well text-center" id="select-form">\
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
                 <label for="amount">Amount ($)</label>\
                 <input type="text" id="amount" class="form-control">\
              </div> \
              <button type="submit" class="btn btn-default">Submit</button>\
              <img src="assets/images/loader.gif">\
            </form>\
          </div> \
        </div> \
      </div>',

  // formEl: '<div class="container">\
  //            <div class="row">\
  //            </div>\
  //          </div>',

  // pickStockEl: '<div class="form-group text-center">\
  //                 <label for="symbol">Pick a Stock</label>\
  //                 <input type="text" id="symbol" class="form-control">\
  //                 <button type="button" class="btn btn-default">Next</button>\
  //               </div>',

  // pickDateTemplate: _.template('<div class="form-group">\
  //                                   <label for="date">Pick a Start Date</label>\
  //                                   <h1><%= symbol %></h1>\
  //                                   <input type="date" id="date" class="form-control">\
  //                                   <button type="button" class="btn btn-default">Next</button>\
  //                                 </div>'),

  // pickAmountTemplate: _.template('<div class="form-group">\
  //                                   <label for="date">Pick an Amount ($)</label>\
  //                                   <h1><%= symbol %> <%= date %></h1>\
  //                                   <input type="text" id="amount" class="form-control">\
  //                                   <button type="button" class="btn btn-default">Next</button>\
  //                                 </div>'),

  // addStockTemplate: _.template('<div class="btn-group" role="group">\
  //                                 <h1><%= symbol %></h1>\
  //                                 <h1><%= date %></h1>\
  //                                 <h1><%= amount %><h1>\
  //                                 <button type="submit" class="btn btn-default">Add Stock</button>\
  //                                 <button type="button" class="btn btn-warning">Cancel</button>\
  //                               </div>'),


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
    var requestStock = {
      symbol: this.$('#symbol').val().toUpperCase(),
      from: this.$('#date').val(),
      amount: this.$('#amount').val(),
      to: d.toISOString().slice(0,10) //Just the YYYY-MM-DD portion
    };
    /* Create will create a new stock in the collection
       and send a request for the pertinent information */
    if(this.collection.hasStock(requestStock.symbol)) {
      console.log('made it');
      this.collection.updateStock(requestStock);
    } else {
      this.collection.create(requestStock);
    }
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
