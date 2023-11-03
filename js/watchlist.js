import { getWatchList, removeMovieFromWatchlist } from "./storage.js";
import { renderMovie, renderEmptyWatchList } from "./render.js";
import { fetchMovie } from "./fetchAPI.js";

const mainEL = document.querySelector("#main");

document.addEventListener("click", (event) => {
  if (event.target.dataset.remove) {
    removeMovieFromWatchlist(event.target.dataset.remove);
    renderWatchlist();
  }
});

const renderWatchlist = async () => {
  mainEL.innerHTML = "";
  if ([...getWatchList()].length) {
    await Promise.all(
      [...getWatchList()].map(async (movieId) => {
        const html = renderMovie(await fetchMovie(movieId));
        mainEL.innerHTML += html;
      })
    );
  } else {
    mainEL.innerHTML = renderEmptyWatchList();
  }
};

renderWatchlist();
