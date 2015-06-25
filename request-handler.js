//include yahooFinance npm module
var yahooFinance = require('yahoo-finance');

var signupLogin = function(req,res) {
  console.log('here in signup - redirect');
  res.redirect('/login');
};

var login = function(req,res) {
  console.log('in GET login - render');
  res.render('index.html');
};

var signup = function(req,res) {
  // res.render('SignupView.js');
};

var getStocks = function(req,res) {
  // use npm yahooFinance library function to instantiate stock request
  yahooFinance.historical({
    symbol: req.body.symbol,
    from: req.body.from, //FORMAT: 'YYYY-MM-DD',
    to: req.body.to,     //FORMAT: 'YYYY-MM-DD',
    period: 'd'          // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only) 
  }, function (err, quotes) {
    if(err) return console.log(err);
    res.json(quotes);
  });
};

module.exports.signupLogin = signupLogin;
module.exports.signup = signup;
module.exports.login = login;
module.exports.getStocks = getStocks;