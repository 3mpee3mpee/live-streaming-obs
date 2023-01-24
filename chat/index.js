const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
  console.log(`client[${socket.id}] connected`);
  console.log('current clients count: ', io.engine.clientsCount);
  
  io.emit('user-counter', io.engine.clientsCount);
  // New message event
  socket.on('send message', (msg) => {
    io.emit('new message', msg);
  });

  // Disconnect user
  socket.on('disconnect', () => {
    io.emit('user-counter', io.engine.clientsCount);
    console.log(`user[${socket.id}] disconnected`);
  });
});

server.listen(5000, () => {
  console.log('listening on *:5000');
});
