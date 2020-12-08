let express = require('express');
let socket = require('socket.io');
let app = express()
let server = app.listen(process.env.PORT || 5000)

app.use(express.static('public'))

let io = socket(server)
let connectedclient = 0

io.on('connection', function (socket) {
    connectedclient += 1
    console.log("there are " + connectedclient + " client connected")
    socket.on('disconnect', function () {
        connectedclient -= 1
        console.log("there are " + connectedclient + " client connected")
    })


    socket.on('newroom', function (res) {
        socket.join(res)
        socket.broadcast.emit('newroom', res)
    })
})