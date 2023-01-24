const express = require('express');
require('dotenv').config();
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_HOST,
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

server.listen(process.env.CHAT_PORT, () => {
  console.log('listening on *:5000');
});
