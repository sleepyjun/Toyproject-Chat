const app = require("express")();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080",
    credentials: true,
  },
});

const chat = io.of("/chat");

chat.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('invalid username'));
  }
  console.log(username);

  next();
});

chat.on('connection', socket => {
  console.log('connected!');
})

server.listen(3000, () => {
  console.log("listening on *:3000");
});