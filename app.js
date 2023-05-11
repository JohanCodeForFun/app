const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const chatRoom = "main room";
const waitingRoom = "waiting room";
let usersInChat = 0;

app.use(express.static('public'));
const port = 3000;

server.listen(port, () => {
  console.log('http server listening on port: ' + port)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/create.html');
});

app.get('/update', (req, res) => {
  res.sendFile(__dirname + '/update.html');
});

app.get('/delete', (req, res) => {
  res.sendFile(__dirname + '/delete.html');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {

  console.log('användare anslöt till chatrummet');
  usersInChat++;

  console.log('användare i main room: ' + usersInChat);
  
  if(usersInChat <= 2) {

    socket.join(chatRoom);
    socket.emit('server message', 'Välkommen! Hur kan vi hjälpa dig idag?')
  
  } else {

    socket.join(waitingRoom); 
    socket.emit('server message', 'Just nu är våra bibliotekarie upptagna. Kom tillbaks om en stund för att få hjälp.')
  }

  socket.on("disconnect", () => {
    usersInChat--;
  });

  socket.on('chat message', (msg => {
    io.emit('chat message', msg);
  }))
});
