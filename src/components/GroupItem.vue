<template>
  <div class="group">
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
  }
}
</script>

<style lang="scss" scoped>

</style>