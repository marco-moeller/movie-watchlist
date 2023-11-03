import {
  saveWatchList,
  getLastSearch,
  saveSearch,
  removeMovieFromWatchlist,
} from "./storage.js";
import { fetchMovie, fetchMovies } from "./fetchAPI.js";
import { renderMovie, renderNotFound } from "./render.js";

const mainEL = document.querySelector("#main");
const inputEL = document.querySelector("#search");

let movieList = [];

document.addEventListener("click", (event) => {
  if (event.target.dataset.movie) {
    saveWatchList(event.target.dataset.movie);
    fetchMovieDetails(getLastSearch());
  }
  if (event.target.dataset.remove) {
    removeMovieFromWatchlist(event.target.dataset.remove);
    fetchMovieDetails(getLastSearch());
  }
});
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", () => {
  handleSearch();
});

const handleSearch = async () => {
  const data = await fetchMovies(inputEL.value);
  if (data.Response === "True") {
    saveSearch(data.Search);
    fetchMovieDetails(data.Search);
  } else {
    mainEL.innerHTML = renderNotFound();
  }
};

const fetchMovieDetails = async (movies) => {
  movieList = [];
  await Promise.all(
    movies.map(async (movie) => {
      const data = await fetchMovie(movie.imdbID);
      movieList.push(data);
    })
  );
  renderMovieList();
};

const renderMovieList = () => {
  mainEL.innerHTML = "";
  mainEL.innerHTML += movieList
    .sort((a, b) =>
      a.imdbRating === b.imdbRating
        ? a.Title.localeCompare(b.Title)
        : b.imdbRating - a.imdbRating
    )
    .map((movie) => renderMovie(movie));
};

if (getLastSearch()) {
  fetchMovieDetails(getLastSearch());
}
