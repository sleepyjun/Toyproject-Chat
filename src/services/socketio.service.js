import { io } from "socket.io-client";

class SocketioService {
  socket = null;
  setupSocketConnection() {
    if (this.socket !== null) return this.socket;
    this.socket = io('http://localhost:3000/chat', {
      autoConnect: false,
    });
    this.socket.onAny((event, ...args) => {
      console.log(event, args);
    });
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

