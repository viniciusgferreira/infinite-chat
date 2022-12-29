import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = 3000;
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

io.on('connection', (socket) => {
    const userName = socket.handshake.query.username;
    console.log(`socket ${socket.id} as username: ${userName} connected`);
    socket.on('chat message', (username: string, msg: string) => {
        console.log(`new message from ${username} received: ${msg}`);
        io.emit('chat message', username, msg);
    });

    // upon disconnection
    socket.on('disconnect', (reason: string) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
        io.emit('chat message', userName, 'has left the chat');
    });
});

//SERVER START
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});