<template>
  <button type="button" class="modal-button" data-bs-toggle="modal" data-bs-target="#make-group-modal" >
    <i>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        class="bi bi-plus-lg"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
        />
      </svg>
    </i>
  </button>

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

export default {
  name: 'MakeGroup',
  data () {
    return {
      socket: null,
      groupName: '',
      groupExplain: '',
    };
  },
  created () {
    this.socket = SocketioService.setupSocketConnection();
    console.log(this.socket.auth.nickname);
  },
  methods: {
    createGroup () {
      this.socket.emit('create-group', {
        groupName: this.groupName, 
        groupExplain: this.groupExplain
      });
      this.groupName = '';
      this.groupExplain = '';
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
  .modal-button {
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: #6fcf97;
    box-shadow: 0px 0px 20px #d3d3d3;
    cursor: pointer;
    transition: 0.5s;
  }
</style>
