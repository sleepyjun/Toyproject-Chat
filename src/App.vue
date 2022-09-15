<template>
  <ChatView v-if="login" />
  <LoginView v-else @onSubmit="onSubmit" />
</template>

<script>
  import SocketioService from '@/services/socketio.service';
  import LoginView from '@/views/LoginView';
  import ChatView from '@/views/ChatView';

  export default {
    components: {
      LoginView,
      ChatView,
    },
    data() {
      return {
        socket: null,
        login: false,
      };
    },
    created() {
      this.socket = SocketioService.setupSocketConnection();

      this.socket.on('connect_error', (err) => {
        this.login = false;
        sessionStorage.removeItem('nickname');
        if (err.message === 'duplicated nickname') {
          alert('이미 사용중인 닉네임입니다');
        }
      });
    },
    methods: {
      onSubmit(nickname) {
        this.socket.auth = { nickname };
        this.socket.connect();

        this.login = true;
        sessionStorage.setItem('nickname', nickname);
      },
    },
    unmounted() {
      if (this.socket) {
        SocketioService.disconnect();
        this.socket = null;
      }
      sessionStorage.removeItem('nickname');
    },
  };
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