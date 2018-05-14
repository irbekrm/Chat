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

const name = _ => window.sessionStorage.name;

window.onload = _ => {
  let disc = document.getElementById('disc');
  let send = document.getElementById('send');
  send && send.addEventListener('click', sendMessage);
  disc && disc.addEventListener('click', onDisc);
  setGreeting();
  socket.emit('join', name());
}

const sendMessage = e => {
  const message = document.getElementById('message').value;
  socket.emit('message', message);
  e.preventDefault();
}

const onDisc = e => {
  socket.emit('willDisconnect', name());
  e.preventDefault();
  window.location.href = HOME;
}

socket.on('disconnected', name => {
  let re = new RegExp(`<p>${name}</p>`);
  let ele = document.getElementById('users');
  ele.innerHTML = ele.innerHTML.replace(re, '');
});

socket.on('post', post => {
  let ele = document.createElement('p');
  let text = document.createTextNode(post);
  ele.appendChild(text);
  let thread = document.getElementById('thread');
  thread.appendChild(ele);
});

socket.on('users', users => {
  let usersDiv = document.getElementById('users');
  users.forEach(user => {
    if (!(usersDiv.innerHTML.includes(user))) usersDiv.innerHTML += `<p>${user}</p>`});
});
