const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
server.listen(3000);

io.on('connection', (socket) => {
  console.log('User is connected ' + socket.id);
  socket.on('client-send-color', (data) => {
    console.log('Data: ' + data);
    io.sockets.emit('server-send-data', data); 
  });
  io.sockets.emit('server-send-notification', 'This is notification');
});