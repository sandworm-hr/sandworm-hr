var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));





var port = process.env.PORT || 8080;

app.listen(port);
console.log('Listening to: ' + port);