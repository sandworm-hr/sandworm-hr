
  describe('Stock Model', function() {

    var stubParse = function(model, response) {
      model.set('history', response);
      model.set('amount', parseFloat(model.get('amount')));
      var nShares = model.get('amount') / model.get('history')[0].adjClose;
      _.each(model.get('history'), function(snapshot) {
        snapshot.nShares = nShares;
      });
    };

    var googModel = new StockModel({amount: 100});
    stubParse(googModel, goog);
    var googHist = googModel.get('history');
    var expectedVal = googHist[20].nShares * googHist[20].adjClose;

    it('should get the value of the stock by index', function() {
      expect(googModel.getValue(0)).to.equal(googModel.get('amount'));
      expect(googModel.getValue(20)).to.equal(expectedVal);
    });

    it('should get the value of the stock by date', function() {
      expect(googModel.getValue("2015-04-14T07:00:00.000Z")).to.equal(googModel.get('amount'));
      expect(googModel.getValue("2015-05-12T07:00:00.000Z")).to.equal(expectedVal);
    });

    it('should get the start date', function() {
      expect(googModel.getStartDate()).to.equalDate(new Date(goog[0].date));
    });

    it('should get the end date', function() {
      expect(googModel.getEndDate()).to.equalDate(new Date(goog[goog.length - 1].date));
    });

    it('should get the start value', function() {
      expect(googModel.getStartVal()).to.equal(googModel.get('amount'));
    });

    it('should get the maximum value', function() {
      expect(googModel.getMaxVal()).to.equal(googModel.getValue("2015-04-24T07:00:00.000Z"));
    });

    it('should get the minimum value', function() {
      expect(googModel.getMinVal()).to.equal(googModel.getValue("2015-04-17T07:00:00.000Z"));
    });

    it('should get the trajectory', function() {
      var trajectory = googModel.getTrajectory();
      expect(trajectory).to.have.length(googHist.length);
      _.each(trajectory, function(snapshot) {
        expect(snapshot).to.have.property('value')
          .that.is.a('number');
        expect(snapshot).to.have.property('symbol')
          .that.is.a('string');
        expect(snapshot).to.have.property('date')
          .that.is.a('date');
      });
      expect(trajectory[20].value).to.equal(expectedVal);
      expect(trajectory[0].value).to.equal(googModel.get('amount'));
    });

    it('should update an existing stock with an earlier history', function() {
      var tslaModel = new StockModel({amount: 100});
      stubParse(tslaModel, tsla1);
      var tslaHist = tslaModel.get('history');
      var trajectory = tslaModel.getTrajectory();
      var firstLength = trajectory.length;
      var firstAmount = tslaModel.get('amount');
      var nShares = tslaHist[0].nShares;

      expect(trajectory[0].value).to.equal(firstAmount);
    });

  });