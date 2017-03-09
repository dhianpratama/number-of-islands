'use strict';

var express = require('express');
var path = require('path');
var pkg = require('./package');

var app = express();
var port = process.env.PORT || 8881;

app.use(express.static(path.resolve(__dirname, 'www')));
app.use(function on(req, res) {
  res.sendFile(path.resolve(__dirname, 'www', 'index.html'));
});
app.listen(port, function on() {
  console.log('> ' + pkg.name + '@' + pkg.version + ' running on localhost:' + port); // eslint-disable-line
});
