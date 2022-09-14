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
</template>
<script>
export default {
  name: 'MakeGroup',
}
</script>
<style lang="scss" scoped>
  .modal-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #6fcf97;
    cursor: pointer;
    transition: 0.5s;
  }
</style>
