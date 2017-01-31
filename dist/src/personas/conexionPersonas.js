'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectPersonas = selectPersonas;

var _index = require('../lib/index');

function selectPersonas() {
  return (0, _index.ejecutarQuery)(selectPersona);
}

var selectPersona = 'select * from persona';