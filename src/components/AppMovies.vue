<template>
  <div>
    <movie-search @search-movie="searchedMovies"></movie-search>
    <ul v-for="movie in filteredMovies" :key="movie.id">
      <movie-row :movie="movie" />
    </ul>
  </div>
</template>
<script>
import { moviesService } from "../services/movies";
import MovieRow from "./MovieRow";
import MovieSearch from "./MovieSearch";

export default {
  components: {
    MovieRow,
    MovieSearch
  },

  data() {
    return {
      movies: [],
      searchTerm: ""
    };
  },

  methods: {
    searchedMovies(search) {
      this.searchTerm = search;
    }
  },

  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      moviesService
        .getAll()
        .then(response => {
          vm.movies = response.data;
        })
        .catch(e => {
          alert(e);
        });
    });
  }
};
</script>
