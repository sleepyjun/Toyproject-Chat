import { io } from "socket.io-client";

class SocketioService {
  socket = null;
  setupSocketConnection() {
    console.log('Hi');
    if (this.socket !== null) return this.socket;
    this.socket = io('http://localhost:3000/chat', {
      reconnection: false, // DEV OPTION
    });
    this.socket.onAny((event, ...args) => {
      console.log(event, args);
    });
    this.socket.on('connect_error', err => {
      console.log(err);
    })
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketioService();

