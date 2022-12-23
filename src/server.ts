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
    console.log(`socket ${socket.id} connected`);

    socket.on('chat message', (msg) => {
        console.log(`new message received: ${msg}`);
        io.emit('chat message', msg);
    });

    // upon disconnection
    socket.on('disconnect', (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
    });
});

//SERVER START
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});