import io from 'socket.io-client'
//import settings from './settings.json'

const socket = io()

socket.on('connect', function () {
    console.log('connected')
});
//socket.on('chat_message', function (data) {
//    console.log('chat msg', data)
//});
socket.on('disconnect', function () {
    console.log('discod')
});

socket.on('reconnect', () => {
    window.location.reload();
})

const user = prompt('Name pls')
socket.emit('user', user)

function sendMessage(message) {
    socket.emit('chat_message', message)
}

function fetchMessages() {
    return new Promise((resolve, reject) => {
        socket.on('backlog', serverBacklog => {
            console.log('got backlog', serverBacklog)
            resolve(serverBacklog.reverse())
        })
        socket.emit('getbacklog')
    })
}

function registerMessageHandlers(messageHandler, userCountHandler) {
    socket.on('chat_message', message => {
        messageHandler(message)
    })
    socket.on('joined', ({user, connected}) => {
        console.log('joined')
        messageHandler({time: Date.now(), user: 'server', message: `user ${user} joined`})
        userCountHandler(connected)
    })
    socket.on('left', ({user, connected}) => {
        console.log('left')
        messageHandler({time: Date.now(), user: 'server', message: `user ${user} left`})
        userCountHandler(connected)
    })
}

export {
    fetchMessages,
    sendMessage,
    registerMessageHandlers,
}