'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _socket3 = require('socket.io-redis');

var _socket4 = _interopRequireDefault(_socket3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var io = (0, _socket2.default)(server);
var port = process.env.PORT || 9000;

app.use(_express2.default.static('public'));

io.adapter((0, _socket4.default)({ host: 'localhost', port: 6379 }));

server.listen(port, function () {
  return console.log('Server listening on port ' + port);
});