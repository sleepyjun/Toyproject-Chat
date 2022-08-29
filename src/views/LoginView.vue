<template>
  <div class="container">
    <div class="username-wrapper">
    <form @submit.prevent="onSubmit">
      <input @input="inputHelper" placeholder="유저 이름을 입력해주세요"/>
      <button :disabled="!isValid">확인</button>
    </form>
  </div>
  </div>
  
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
    };
  },
  computed: {
    isValid () {
      return this.username.length >= 2;
    },
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', this.username);
    },
    inputHelper (event) {
      this.username = event.target.value;
    }
  }

}
</script>
