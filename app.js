const express = require('express');
const app = express();
const session = require('express-session');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const port = 8080;

const sessionMiddleware = session({
    secret: 'secret', // TODO generate hashed value later
    resave: false,
    saveUninitialized: true
});

app.use(sessionMiddleware);

app.use(cors());

app.use(bodyParser.json({limit: '3mb'}));
io.use((socket, next) => {
    sessionMiddleware(socket.request, {}, next);
});
const connections = [];
io.sockets.on('connection', (socket) => {
    connections.push(socket);

    // Disconnect
    socket.on('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1);
        // console.log('Disconnected: %s sockets connected', connections.length);
    });

    socket.on('tweetOut', (payload) => {
        socket.emit('tweetIn', payload);
    });
});


server.listen(port, () => {
    console.log('\n server up! \n');
});