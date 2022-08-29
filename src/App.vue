<template>
  <LoginView v-if="!login" @onSubmit="onSubmit" />
  <ChatView v-else />
</template>

<script>
import SocketioService from '@/services/socketio.service.js'
import LoginView from '@/views/LoginView';
import ChatView from '@/views/ChatView';

export default {
  components: { LoginView, ChatView },
  data () {
    return {
      socket: null,
      login: false,
    }
  },
  created () {
    this.socket = SocketioService.setupSocketConnection();
  },
  methods: {
    onSubmit (username) {
      console.log(username);
      sessionStorage.setItem('user', username);
      this.login = true;
      this.socket.auth = { username };
      this.socket.connect();
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
