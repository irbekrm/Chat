const app = require('./app'),
      http = require('http').Server(app),
      io = require('socket.io')(http),
      port = process.env.PORT || 8080;

io.on('connection', socket => {
  console.log('A new connection was created');
});

http.listen(port, _ => console.log(`Listening on port ${port}`));
