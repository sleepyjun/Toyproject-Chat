<template>
  <div class="group" @click="onClick" :class="{ selected: selected }">
    <div class="info">
      <div class="name">
        {{ group.name }}
      </div>
      <div class="explain">
        {{ group.explain }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupItem',
  props: {
    group: Object,
    selected: Boolean,
  },
  methods: {
    onClick () {
      this.$emit('select');
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  padding: .75rem;
  &.selected {
    background-color: #fff9db;
  }
}
</style>