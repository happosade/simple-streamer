
const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const {port} = require('./resources/settings.json')

const {getNewestMessages, insertMessage} = require('./db')

//app.get('/', function(req, res) {
//    res.render('index.ejs')
//})

const backlogSize = 100

const initMessage = [{ time: Date.now(), user: 'server', message: 'channel created' }]
io.sockets.on('connection', function(socket) {
    socket.on('getbacklog', () => {
        getNewestMessages(100).then((results)=> {
            let clientResults = results.map(({submit_time, submitter_nick, message}) => ({
                time: submit_time,
                user: submitter_nick,
                message
            }))
            console.log('db gave', clientResults)
            console.log('len', clientResults.length)
            if (clientResults.length == 0) {
                clientResults = initMessage
            }
            socket.emit('backlog', clientResults)
            //socket.emit('joined', {user: socket.user, connected: socket.client.conn.server.clientsCount})
        })
    })
    socket.on('user', function (user) {
        if (typeof user === 'string' || user instanceof String) {
            user = user.substring(0, 15)
        } else {
            user = 'anonymous' + ~~(Math.random() * 10000)
        }
        if (user.length == 0) {
            user = 'anonymous' + ~~(Math.random() * 10000)
        }
        socket.user = user
        io.emit('joined', {user: socket.user, connected: socket.client.conn.server.clientsCount})
    })

    socket.on('disconnect', function() {
        //io.emit('left', {user: socket.user, connected: socket.client.conn.server.clientsCount})
    })

    socket.on('chat_message', function(message) {
        console.log('got message', message)
        if (typeof message === 'string' || message instanceof String) {
            message = message.substring(0, 500)
        } else {
            message = 'isuck' + ~~(Math.random() * 1000)
        }

        insertMessage(socket.user, message, err => {
            if (err) {
                console.log('insert fail', err)
            }
        })

        // maybe wait until db insert actually succeeds and only then send the db timestamp
        const time = Date.now()
        io.emit('chat_message', {time, user: socket.user, message})
    })
})


const server = http.listen(port, () => {
    console.log(`listening on ${port}`)
})