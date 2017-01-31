export function ejecutarQuery (myPool, myquerry) {
  return new Promise((resolve, reject) => {
    myPool.connect((err, client, done) => {
      if (err) return reject(err)
      client.query(myquerry, (err, result) => {
        done()
        if (err) return reject(err)
        resolve(result.rows)
      })
    })
  })
}
