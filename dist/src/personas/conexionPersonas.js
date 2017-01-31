"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectPersonas = selectPersonas;

var _index = require("../lib/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function selectPersonas(data, myPool) {
  return (0, _index2.default)(myPool, selectPersona);
}

var selectPersona = "select * from persona'";