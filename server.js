const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.use(express.static('./public'));

const messages = [
];

io.on('connection', (socket) => {
    console.log('User conectado, id: ' + socket.id);
    socket.emit('messages', messages);

    socket.on('new-message', (newMessage) => {
        console.log({newMessage});
        messages.push(newMessage);
        io.sockets.emit('messages', messages)
    })

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit("chat:typing", data)
    });

});

httpServer.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});