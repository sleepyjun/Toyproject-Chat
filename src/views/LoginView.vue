<template>
  <div class="container">
    <div class="nickname-wrapper">
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
      nickname: '',
    };
  },
  computed: {
    isValid () {
      return this.nickname.length >= 2;
    },
  },
  methods: {
    onSubmit () {
      this.$emit('onSubmit', this.nickname);
    },
    inputHelper (event) {
      this.nickname = event.target.value;
    }
  }

}
</script>
