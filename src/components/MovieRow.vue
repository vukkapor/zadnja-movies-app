<template>
  <div>
    <li :class="{selected: isSelected}">
      ID: {{movie.id}}
      Title: {{movie.title}}
      Director: {{movie.director}}
      Url: {{movie.imageUrl}}
      Duration: {{movie.duration}}
      Release Date: {{movie.releaseDate}}
      Genre: {{movie.genre}}
    </li>
    <button v-if="!isSelected" @click="selected">Select</button>
    <button v-else @click="selected">Deselect</button>
  </div>
</template>

<script>
export default {
  props: ["movie", "isSelected"],

  methods: {
    selected() {
      this.$emit("select", this.movie.id);
    }
  }
};
</script>

<style>
.selected {
  color: red;
}
.notSelected {
  color: blue;
}
</style>

