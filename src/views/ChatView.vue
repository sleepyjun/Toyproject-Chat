<template>
  <div  class="container-fluid d-flex flex-row p-0">
    <div class="left p-2">
      <GroupItem
        v-for="group in groups"
        :key="group.name"
        :group="group"
      />
    </div>
    <div class="right flex-grow-1 p-2">
      <img alt="Vue logo" src="../assets/logo.png">
    </div> 
  </div>
  <MakeGroup />
</template>

<script>
import SocketioService from '@/services/socketio.service';
import MakeGroup from '@/components/MakeGroup';
import GroupItem from '@/components/GroupItem';

export default {
  name: 'ChatView',
  components: {
    MakeGroup,
    GroupItem,
  },
  data () {
    return {
      socket: null,
      groups: [],
    };
  },
  created () {
    this.socket = SocketioService.setupSocketConnection();
    this.socket.on('groups', (groups) => {
      groups.forEach(group => {
        this.groups.push(group);
      })
    })
    this.socket.on('group-created', (group) => {
      this.groups.push(group);
      console.log(group);
    });

    this.socket.on('error', (data) => {
      if (data.name === 'SequelizeUniqueConstraintError') {
        alert('이미 생성된 그룹 이름입니다');
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.left {
  min-width: 250px;
  overflow-x: hidden;
  background-color: #fff0f6;
}
.container-fluid {
  height: 100vh;
}
</style>