const express = require('express');
const {createServer} = require('node:http');

const app = express();
const server = createServer(app);
const {join} = require('path');
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected '+ socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected '+ socket.id);
    });
    socket.on('chat message', (msg) => {
        // console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});