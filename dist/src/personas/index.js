'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _conexionPersonas = require('./conexionPersonas');

var _conexionPersonas2 = _interopRequireDefault(_conexionPersonas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var pool;

router.get('/personas', function (req, res) {
  (0, _conexionPersonas2.default)(pool).then(function (data) {
    return res.json(data);
  }).catch(function (err) {
    return res.json(err);
  });
});

exports.default = router;