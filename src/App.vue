<template>
  <ChatView v-if="login" />
  <LoginView v-else @onSubmit="onSubmit" />
</template>

<script>
  import SocketioService from "@/services/socketio.service";
  import LoginView from "@/views/LoginView";
  import ChatView from "@/views/ChatView";

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

      this.socket.on("connect_error", (err) => {
        console.log(err);
        this.login = false;
      });
    },
    methods: {
      onSubmit(nickname) {
        console.log(nickname);
        sessionStorage.setItem("nickname", nickname);
        this.login = true;
        this.socket.auth = { nickname };
        this.socket.connect();
      },
    },
    unmounted() {
      if (this.socket) {
        SocketioService.disconnect();
        this.socket = null;
      }
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