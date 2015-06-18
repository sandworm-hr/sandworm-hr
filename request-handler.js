//Adding request handler file

var yahooFinance = require('yahoo-finance');

var getStocks = function(/* req,res 
  */) {
  // var ticker = req.body.symbol;
  // var start = req.body.startDate;
  // var end = req.body.endDate;
  yahooFinance.historical({
    symbol: 'AAPL',//ticker,
    from: '2015-01-02',//start, //FORMAT: 'YYYY-MM-DD',
    to: '2015-01-05',//end, //FORMAT: 'YYYY-MM-DD',
    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
  }, function (err, quotes) {
    if(err) return console.log(err);
    console.log(quotes);
    // res.json(quotes);
  });

};

module.exports.getStocks = getStocks;