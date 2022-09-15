<template>
  <div class="message-panel">
    <div class="header">
      <h1>{{ group.name }}</h1>
    </div>
    <div class="main">
      <div 
        v-for="message in filteredMessages"
        :key="message.id"
        class="message"
        :class="[message.self ? 'message-in': 'message-out']"
      >
        <p v-if="!message.self" class="username">{{message.sender}}</p>
        <div 
          class="content-wrapper"
          :class="[message.self ? 'message-in': 'message-out']"
        >
          <p class="message-time">{{message.createdAt}}</p>
          <p class="text">{{message.message}}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <form @submit.prevent="onSubmit">
        <textarea class="form-control" 
          :value="message" 
          @input="inputHelper"
          @keypress.enter.exact.prevent="onSubmit"
          autofocus
        />
        <button class="btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MessagePanel",
    props: {
      group: Object,
      messages: Object,
    },
    data () {
      return {
        message: '',
      };
    },
    computed: {
      isValid () {
        return this.message.length > 0;
      },
      filteredMessages () {
        return this.messages.filter(message => message.group === this.group.name);
      }
    },
    methods: {
      onSubmit () {
        if (this.isValid === true) {
          this.$emit('chat', this.message);
          this.message = '';
        }
      },
      inputHelper (e) {
        this.message = e.target.value;
      }
    }
  };
</script>

<style lang="scss" scoped>
.message-panel {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: .5rem;
  .header {
    padding: 1rem;
    border-bottom: solid;
  }
  .main {
    flex-grow: 1;
    padding: .25rem;

    display: flex;
    flex-direction: column;
    overflow: scroll;
    
    .message {
      .username {
        text-align: left;
        font-size: 1rem;
        font-weight: bold;
        color: #000;
        margin-top: 10px;
        margin-block-end: 0rem;
      }

      .content-wrapper {
        display: flex;
        align-items: flex-end;
        &.message-in {
          flex-direction: row;
          justify-content: end;
        }
        &.message-out {
          flex-direction: row-reverse;
          justify-content: start;
        }

        .text {
          max-width: 400px;
          display: inline-flex;
          text-align: left;
          white-space: pre-wrap;
          word-break: break-word;
          padding: 1rem;
          font-size: 1rem;
          margin-bottom: 5px;
        }

        .message-time {
          margin: 0 7px;
        }
      }
    }
  }
  .footer {
    border-radius: 0 0 20px 20px;
    box-shadow: 0px -5px 30px rgba(0, 0, 0, 0.05);
    
    form {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    textarea {
      border: none;
      resize: none;
      font-size: 16px;
      width: 100%;
      height: 50px;
      max-height: 100px;
      &::placeholder {
        opacity: 0.7;
      }
      &:focus {
        background-color: #fff;
        outline: none;
      }
    }

    button {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      margin-left: 10px;
    }
  }
}
</style>