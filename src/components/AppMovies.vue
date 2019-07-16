<template>
  <div>
    <movie-search @search-movie="searchedMovies"></movie-search>
    <ul v-for="movie in filteredMovies" :key="movie.id">
      <movie-row :movie="movie" @select="selectedMoviesMethod" />
    </ul>
    <div v-if="filteredMovies.length===0">Ne postoji nijedan</div>
    <div>Broj selektovanih filmova: {{selectedMovies.length}}</div>

    <div>
      <button v-if="movies.length !== selectedMovies.length" @click="selectAll">Select All</button>
      <button v-if="movies.length === selectedMovies.length" @click="deselectAll">Deselect All</button>
    </div>
    <div>
      <button @click="nameAsc">Sort by name ASC</button>
      <button @click="nameDesc">Sort by name DESC</button>
      <button @click="durationAsc">Sort by duration ASC</button>
      <button @click="durationDesc">Sort by duration DESC</button>
    </div>
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
    },

    selectAll() {
      this.selectedMovies = [];
      this.movies.forEach(movie => {
        this.selectedMovies.push(movie.id);
      });
    },

    deselectAll() {
      this.selectedMovies = [];
    },

    nameAsc() {
      this.movies = this.movies.sort(this.compareTitle);
    },

    nameDesc() {
      let tempMovies = this.movies.sort(this.compareTitle);
      this.movies = tempMovies.reverse();
    },

    durationAsc() {
      this.movies = this.movies.sort(this.compareDuration);
    },

    durationDesc() {
      let tempMovies = this.movies.sort(this.compareDuration);
      this.movies = tempMovies.reverse();
    },

    compareTitle(a, b) {
      let titleA = a.title.toUpperCase(); // ignore upper and lowercase
      let titleB = b.title.toUpperCase(); // ignore upper and lowercase

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    },
    compareDuration(a, b) {
      let tempA = parseInt(a.duration, 10);
      let tempB = parseInt(b.duration, 10);
      return tempA - tempB;
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
