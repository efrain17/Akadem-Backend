'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

var _index = require('./personas/index');

var _index2 = _interopRequireDefault(_index);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var port = process.env.PORT || 9000;

var connectionPostgres = {
  user: 'postgres',
  database: 'bd_akadem',
  password: '123456',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

global.pool = new _pg2.default.Pool(connectionPostgres);
pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

app.use('/', _express2.default.static(__dirname + '/dist'));
app.use('/apiPersonas', _index2.default);
app.all('/ag/*', function (req, res) {
  res.status(200).sendFile(_path2.default.join(__dirname, '/dist/index.html'));
});
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

server.listen(port, function () {
  return console.log('Server listening on port ' + port);
});