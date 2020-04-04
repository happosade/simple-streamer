import io from 'socket.io-client'
import settings from './settings.json'

const {serverUrl} = settings

const socket = io(serverUrl)

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
            resolve(serverBacklog)
        })
        socket.emit('getbacklog')
    })
}

function receiveMessage(handler) {
    socket.on('chat_message', message => {
        handler(message)
    })
}

export {
    fetchMessages,
    sendMessage,
    receiveMessage,
}