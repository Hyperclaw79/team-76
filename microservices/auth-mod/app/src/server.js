var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'assets')));

//your routes here
app.get('/', function (req, res) {
    res.sendFile(express.static(path.join(__dirname, 'public','ui.html')));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
