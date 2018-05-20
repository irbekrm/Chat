const app = require('./app'),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      port = process.env.PORT || 8080;

const users = [];

io.on('connection', socket => {
  
  socket.on('message', data => io.emit('post', data))

  socket.on('willDisconnect', name => { 
    io.emit('disconnected', name);
    socket.disconnect();
  });

  socket.on('join', name => {
    users.push(name);
    io.emit('users', users);
  });
});

http.listen(port, _ => console.log(`Listening on port ${port}`));
module.exports = http;
