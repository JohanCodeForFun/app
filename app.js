const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

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


