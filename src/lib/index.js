export function ejecutarQuery (myquerry) {
  return new Promise((resolve, reject) => {
    global.pool.connect((err, client, done) => {
      if (err) return reject(err)
      client.query(myquerry, (err, result) => {
        done()
        if (err) return reject(err)
        resolve(result.rows)
      })
    })
  })
}
