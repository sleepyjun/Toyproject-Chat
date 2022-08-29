<template>
  <div  class="container-fluid d-flex flex-row">
    <div class="left p-2">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
    <div class="right flex-grow-1 p-2">
      <img alt="Vue logo" src="../assets/logo.png">
    </div> 
  </div>
</template>

<script>
// import SocketioService from '@/services/socketio.service.js'

export default {
  name: 'ChatView',
}
</script>

<style lang="scss" scoped>
.left {
  min-width: 100px;
  overflow-x: hidden;
  background-color: red;
}
.container-fluid {
  height: 100vh;
}
</style>