import http from 'http'
import express from 'express'
import socketio from 'socket.io'
import redis from 'socket.io-redis'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 9000

app.use(express.static('public'))

io.adapter(redis({ host: 'localhost', port: 6379 }))

server.listen(port, () => console.log(`Server listening on port ${port}`))
