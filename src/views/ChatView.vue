<template>
  <div class="container-fluid d-flex flex-row p-0">
    <div class="left">
      <div class="group-wrapper">
        <GroupItem
          v-for="group in groups"
          :key="group.name"
          :group="group"
          :selected="selectedGroup === group"
          @select="onSelect(group)"
        />
      </div>
      <ChatNavbar 
        :nickname="nickname"
      />
    </div>
    <MessagePanel 
      v-if="selectedGroup" 
      :group="selectedGroup"
      :messages="messages"
      @chat="chat"
    />
  </div>

  <div class="modal fade" id="make-group-modal" tabindex="-1" aria-labelledby="make-group-modal-label" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="make-group-modal-label">그룹 생성하기</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="group-name" class="col-form-label">그룹 이름</label>
              <input type="text" class="form-control" id="group-name" :value="groupName" @input="groupNameInputHelper">
            </div>
            <div class="mb-3">
              <label for="group-explain" class="col-form-label">그룹 설명</label>
              <textarea class="form-control" id="group-explain" :value="groupExplain" @input="groupExplainInputHelper"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close" @click="createGroup">생성하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SocketioService from '@/services/socketio.service';
import GroupItem from '@/components/GroupItem';
import MessagePanel from '@/components/MessagePanel';
import ChatNavbar from '@/components/ChatNavbar';

export default {
  name: 'ChatView',
  components: {
    GroupItem,
    MessagePanel,
    ChatNavbar,
  },
  data () {
    return {
      socket: null,
      selectedGroup: null,
      groups: [],
      messages: [],
      nickname: '',
      groupName: '',
      groupExplain: '',
    };
  },
  created () {
    this.socket = SocketioService.setupSocketConnection();
    this.nickname = sessionStorage.getItem('nickname');
    
    this.socket.on('groups', (groups) => {
      groups.forEach(group => {
        this.groups.push(group);
      })
    })
    this.socket.on('group-created', (group) => {
      this.groups.push(group);
    });
    this.socket.on('chat', (data) => {
      const sended = new Date(data.createdAt)
      if (sended.toDateString() === new Date().toDateString()) {
        data.createdAt = sended.toLocaleTimeString(navigator.language, {
          hour: '2-digit',
          minute: '2-digit'
        })
      } else {
        data.createdAt = sended.getUTCMonth() + 1 + '/' + sended.getUTCDate()
      }
      
      const messageData = {
        self: this.nickname === data.sender,
        ...data,
      }
      this.messages.push(messageData);
      console.log(messageData);
    })

    this.socket.on('db_error', (data) => {
      if (data.name === 'SequelizeUniqueConstraintError') {
        alert('이미 생성된 그룹 이름입니다');
      }
      else {
        console.log(data);
      }
    });
  },
  methods: {
    onSelect (group) {
      this.selectedGroup = group;
    },
    createGroup () {
      this.socket.emit('create-group', {
        groupName: this.groupName, 
        groupExplain: this.groupExplain
      });
      this.groupName = '';
      this.groupExplain = '';
    },
    chat (message) {
      if (this.selectedGroup) {
        this.socket.emit('chat', {
          nickname: this.nickname, 
          groupName: this.selectedGroup.name,
          message,
        });
      }
    },
    groupNameInputHelper (event) {
      this.groupName = event.target.value;
    },
    groupExplainInputHelper (event) {
      this.groupExplain = event.target.value;
    },
  }
}
</script>

<style lang="scss" scoped>
.left {
  min-width: 250px;
  overflow-x: hidden;
  background-color: #fff0f6;
  height: 90vh;
  .group-wrapper {
    display: flex;
    flex-direction: column;
  }
}
.container-fluid {
  height: 100vh;
}
</style>