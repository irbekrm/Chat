const HOME = 'http://localhost:8080';

const io = require('socket.io-client'),
      socket = io();

window.onload = _ => {
  let disc = document.getElementById('disc');
  let send = document.getElementById('send');
  send && send.addEventListener('click', sendMessage);
  disc && disc.addEventListener('click', onDisc);
}

const sendMessage = e => {
  const message = document.getElementById('message').value;
  socket.emit('message', message);
  e.preventDefault();
}

const onDisc = e => {
  socket.disconnect();
  e.preventDefault();
  window.location.href = HOME;
}
