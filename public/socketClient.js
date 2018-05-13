const HOME = 'http://localhost:8080';

const io = require('socket.io-client'),
      socket = io();

const setGreeting = _ => {
  let greet = document.getElementById('greet');
  let name = window.sessionStorage.name;
  if(name) {
    greet.innerHTML = `You are signed in as ${name}`;
  }
}

window.onload = _ => {
  let disc = document.getElementById('disc');
  let send = document.getElementById('send');
  send && send.addEventListener('click', sendMessage);
  disc && disc.addEventListener('click', onDisc);
  setGreeting();
}

const sendMessage = e => {
  const message = document.getElementById('message').value;
  socket.emit('message', message);
  e.preventDefault();
}

const onDisc = e => {
  socket.disconnect(true);
  e.preventDefault();
  window.location.href = HOME;
}

socket.on('post',post => {
  let ele = document.createElement('p');
  let text = document.createTextNode(post.text);
  ele.appendChild(text);
  let thread = document.getElementById('thread');
  thread.appendChild(ele);
});
