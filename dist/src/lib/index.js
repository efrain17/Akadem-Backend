"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ejecutarQuery = ejecutarQuery;
function ejecutarQuery(myPool, myquerry) {
  return new Promise(function (resolve, reject) {
    myPool.connect(function (err, client, done) {
      if (err) return reject(err);
      client.query(myquerry, function (err, result) {
        done();
        if (err) return reject(err);
        resolve(result.rows);
      });
    });
  });
}