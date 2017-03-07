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

export function promisseNormal (promisse, res) {
  promisse
  .then(data => res.json(data))
  .catch(err =>	{
    console.log(err)
    res.sendStatus(500).json(err)
  })
}

export function contructSqlvalues (dataPersonas, idPersona, operation, callback) {
  let sqlValues = ''
  let chois = ''
  let ch = operation === 'insert' ? ',' : '  or '
  let dataFilter = dataPersonas.filter(data => data.operacion === operation)
  dataFilter.map(data => {
    sqlValues = sqlValues + chois + callback(data)
    chois = ch
  })
  return sqlValues
}
