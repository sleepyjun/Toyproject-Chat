<template>
  <div class="message-panel">
    <div class="header">
      <h1>{{ group.name }}</h1>
    </div>
    <div class="main">

    </div>
    <div class="footer">
      <form @submit.prevent="onSubmit">
        <textarea class="form-control" :value="message" @input="inputHelper"/>
        <button class="btn">전송</button>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MessagePanel",
    props: {
      group: Object,
    },
    data () {
      return {
        message: '',
      };
    },
    methods: {
      onSubmit () {
        this.message = '';
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