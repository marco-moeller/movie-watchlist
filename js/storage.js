export const saveWatchList = (movieId) => {
  const watchList = getWatchList().add(movieId);
  localStorage.setItem("movieWatchlist", JSON.stringify([...watchList]));
};

export const getWatchList = () => {
  return new Set(JSON.parse(localStorage.getItem("movieWatchlist")));
};

export const removeMovieFromWatchlist = (movieId) => {
  const watchList = getWatchList();
  watchList.delete(movieId);
  localStorage.setItem("movieWatchlist", JSON.stringify([...watchList]));
};

export const saveSearch = (movies) => {
  localStorage.setItem("movieSearch", JSON.stringify(movies));
};

export const getLastSearch = () => {
  return JSON.parse(localStorage.getItem("movieSearch"));
};
