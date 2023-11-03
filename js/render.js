import { getWatchList } from "./storage.js";

export const renderMovie = (movie) => {
  const { Title, Poster, imdbRating, Runtime, Genre, Plot, imdbID } = movie;
  return `<section class="movie">
    <img class="poster" src="${
      Poster === "N/A" ? "/images/placeholder.jpg" : Poster
    }" alt="poster" />
    <div class="heading-container">
      <h2 class="movie-title">${Title}</h2>
      <h3 class="rating">
        <img src="images/Icon.png" alt="star icon" />
        ${imdbRating}
      </h3>
    </div>
    <div class="info-container">
      <h3 class="runtime">${Runtime}</h3>
      <h3 class="genres">${Genre}</h3>
      ${
        isOnWatchList(imdbID)
          ? ` <button class="add-to-watchlist-btn" data-remove="${imdbID}">
          <img
            class="plus-icon icon"
            src="images/icon-1.png"
            alt="plus icon"
            data-remove="${imdbID}"
          />
          Remove
        </button>`
          : `<button class="add-to-watchlist-btn" data-movie="${imdbID}">
            <img class="plus-icon icon" src="images/icon-1.png" alt="plus icon" data-movie="${imdbID}"/>
            Watchlist
          </button>`
      } 
    </div>
    <p class="plot">
    ${Plot}
    </p>
  </section>`;
};

const isOnWatchList = (imdbID) => {
  return [...getWatchList()].includes(imdbID);
};

export const renderNotFound = () => {
  return `<div class="empty-container">
  <h4>Unable to find what you're looking for. Please try another search.</h4>
  </div>`;
};

export const renderEmptyWatchList = () => {
  return `<div class="empty-container">
  <h4>Your watchlist is looking a little empty...</h4>
  <a class="lets-add-movies" href="/index.html">
  <img
    class="plus-icon icon"
    src="images/icon-1.png"
    alt="plus icon"
  />
  Let’s add some movies!
</a>
  </div>`;
};
