<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/logo.png">
    <LogIn 
      v-if="true"
      @onSubmit="onSubmit"
    />
    <!-- <select /> -->
  </div>
</template>

<script>
import SocketioService from '@/services/socketio.service.js'
import LogIn from '@/components/LogIn';

export default {
  name: 'HomeView',
  components: {
    LogIn,
  },
  data () {
    return {
      socket: null,
    };
  },
  created () {
    this.socket = SocketioService.setupSocketConnection();
  },
  methods: {
    onSubmit (username) {
      console.log(username);
      sessionStorage.setItem('user', username);
      this.socket.auth = { username };
      this.socket.connect();
    }
  }
}
</script>
