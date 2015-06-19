var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var handler = require('./request-handler.js');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));
// var stockRouter = express.Router();
app.use('/api/stocks', handler.getStocks);

// require('./request-handler')(stockRouter);

var port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening to: ' + port);