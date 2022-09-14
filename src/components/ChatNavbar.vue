<template>
  <nav class="navbar">
    <h1 class="navbar-brand p-2">{{ nickname }}</h1>
    <MakeGroup />
  </nav>
</template>

<script>
import MakeGroup from './MakeGroup';
export default {
  components: { MakeGroup },
  name: 'ChatNavbar',
  data () {
    return {
      nickname: ''
    };
  },
  created () {
    this.nickname = sessionStorage.getItem("nickname");
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 250px;
  height: 10vh;
  max-height: 80px;
  background-color: #f8f9fa;
  position: fixed;
  bottom: 0;
}
</style>