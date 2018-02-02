var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'assets')));

//var hasuraExamplesRouter = require('./hasuraExamples');

var server = require('http').Server(app);

router.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use('/', hasuraExamplesRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'assets','ui.html'));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
