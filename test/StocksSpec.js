
  describe('Stocks Collection', function() {

    it('should get the earliest date', function() {

    });

    it('should get the latest date', function() {

    });

    it('should normalize stocks', function() {

    });

    it('should average all the stocks', function() {

    });

  });



  // var testApp = new AppModel();
  // var testStocks = new Stocks();

  // var d = new Date();
  //   /* Create will create a new stock in the collection
  //      and send a request for the pertinent information */


  // testStocks.create({
  //   symbol: 'AAPL',
  //   from: '2012-05-17',
  //   amount: "100",
  //   to: d.toISOString().slice(0,10), //Just the YYYY-MM-DD portion
  // });

  // testStocks.on('sync', function() {
  //   if (this.length === 1) {
  //     this.create({
  //       symbol: 'GOOG',
  //       from: '2011-02-13',
  //       amount: '200',
  //       to: d.toISOString().slice(0,10)
  //     });
  //   } else {
  //     if (this.length === 2) {
  //       this.trigger('testing', this);
  //     }
  //   }
  // });

  // testStocks.on('testing', function() {
  //  var normalized = this.normalizeStocks();
  //  var avg = this.getAverage();
  //  console.log('Average, ', avg);
  // });