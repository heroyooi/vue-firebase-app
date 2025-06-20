<template>
  <MemoApp />
</template>

<script setup>
import MemoApp from './components/MemoApp.vue';
</script>

<style lang="scss" scoped>
.container {
  padding: 2rem;

  h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  input {
    padding: 0.5rem;
    margin-right: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    background: #42b983;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;

    &:hover {
      background: #369870;
    }
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 0.5rem 0;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
