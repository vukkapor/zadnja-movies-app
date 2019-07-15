<template>
  <input type="text" @input="search" />
</template>

<script>
export default {
  methods: {
    search(event) {
      this.$emit("search-movie", event.target.value);
    }
  }
};
</script>
