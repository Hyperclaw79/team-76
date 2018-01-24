var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, 'assets')));

//your routes here
app.get('/ui', function (req, res) {
    res.sendFile(path.join(__dirname, 'assets','ui.html'));
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
