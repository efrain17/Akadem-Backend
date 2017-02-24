import http from 'http'
import express from 'express'
import pg from 'pg'
import apiPersonas from './personas/index'
import apiAcademica from './estructura-academica/index'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 9000

var connectionPostgres = {
  user: 'postgres',
  database: 'bd_akadem',
  password: '123456',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}

global.pool = new pg.Pool(connectionPostgres)
global.pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', express.static(__dirname + '/public'))
app.use('/api/personas', apiPersonas)
app.use('/api/academica', apiAcademica)
app.all('/app/*', (req, res) => {
  res.status(200).sendFile(
    path.join(__dirname, '/public/index.html'))
})

server.listen(port, () => console.log(`Server listening on port ${port}`))
