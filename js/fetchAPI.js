const BASE_URL = "http://www.omdbapi.com/?apikey=";
const KEY = "de2f1a02";

export const fetchMovie = async (movieId) => {
  const response = await fetch(BASE_URL + KEY + "&i=" + movieId);
  const data = await response.json();
  return data;
};

export const fetchMovies = async (value) => {
  const response = await fetch(
    `${BASE_URL}${KEY}&s="${value}&type=movie&plot=short`
  );
  const data = await response.json();
  return data;
};
