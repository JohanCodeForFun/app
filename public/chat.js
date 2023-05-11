let socket = io();

const btnSend = document.querySelector('#send-button');
const messageBox = document.querySelector('.message-box');

btnSend.addEventListener('click', () => {
  const input = document.querySelector('#message-input');
  socket.emit('chat message', input.value)
})

socket.on('chat message', message => {
  messageBox.innerHTML += `<div class="message">${message}</div>`
})

socket.on('server message', message => {
  messageBox.innerHTML += `<div class="message">${message}</div>`
})