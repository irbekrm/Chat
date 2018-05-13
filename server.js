const app = require('./app'),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      port = process.env.PORT || 8080;

const users = [];

io.on('connection', socket => {
  console.log('A new connection was created');
  
  socket.on('message', message => {console.log('A message was received ', message);
    io.emit('post', { text: message });
  });

  socket.on('disconnect', _ => console.log('disconnecting'));

  socket.on('join', data => {console.log(`${data.name} joined`);
    users.push(data.name);
    io.emit('users', { users: users });
  });
});

http.listen(port, _ => console.log(`Listening on port ${port}`));
