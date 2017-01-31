import http from 'http'
import express from 'express'
import pg from 'pg'
import apiPersonas from './personas/index'
import path from 'path'
import bodyParser from 'body-parser'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 9000

var connectionPostgres = {
  user: 'efrain',
  database: 'akadem',
  password: '123456',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}

var pool = new pg.Pool(connectionPostgres)
pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack)
})

app.use('/', express.static(__dirname + '/dist'))
app.use('/apiPersonas', apiPersonas)
app.all('/ag/*', (req, res) => {
  res.status(200).sendFile(
    path.join(__dirname, '/dist/index.html'))
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

server.listen(port, () => console.log(`Server listening on port ${port}`))
