<template>
  <div>
    <movie-search @search-movie="searchedMovies"></movie-search>
    <ul v-for="movie in filteredMovies" :key="movie.id">
      <movie-row :movie="movie" @select="selectedMoviesMethod" />
    </ul>
    <div v-if="filteredMovies.length===0">Ne postoji nijedan</div>
    <div>Broj selektovanih filmova: {{selectedMovies.length}}</div>
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
      searchTerm: "",
      selectedMovies: []
    };
  },

  methods: {
    searchedMovies(search) {
      this.searchTerm = search;
    },

    selectedMoviesMethod(id) {
      if (this.selectedMovies.includes(id)) {
        let indexOf = this.selectedMovies.indexOf(id);
        this.selectedMovies.splice(indexOf, 1);
        return;
      }
      this.selectedMovies.push(id);
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
