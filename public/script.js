const HOME = 'http://localhost:8080/';

window.onload = _ => {
  listen();
  setGreeting();
}

const listen = _ => {
  signup = document.getElementById('signup');
  signup && signup.addEventListener('click', onSignup);
}

const setGreeting = _ => {
  const name = window.sessionStorage.name;
  if (name) {
    document.getElementById('greeting').innerHTML = `You are signed in as ${name}`;
  }
}

async function onSignup(e) {
  await submitUserDetails('auth/signup').then(result => processResult(result)).catch(err => console.log(err));
  redirect(HOME);
  e.preventDefault();
};

const submitUserDetails = ext => {
  const url = `${HOME}${ext}`;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const params = `username=${username}&password=${password}`;
  const headers = { 'Content-type': 'application/x-www-form-urlencoded' }
  return sendRequest('POST', url, params, headers);
}; 

const sendRequest = (method, url, params='', headers={}) => {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.onreadystatechange = _ => {
      if(xhr.readyState == 4) {
        xhr.status == 200 ? res(xhr.responseText) : rej(xhr.statusText);
      }
    };
    for(let head in headers) { xhr.setRequestHeader(head, headers[head]) };
    xhr.send(params);
  });
};

const setStorage = result => {for(let key in result) { window.sessionStorage.setItem(key, result[key]); }};

const processResult = result => {
  result = JSON.parse(result);
  setStorage(result);
};

const redirect = address => window.location.href = address;