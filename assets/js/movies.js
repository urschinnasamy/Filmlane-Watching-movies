const API_KEY = "ac01f8721680d7c05c829a2eba3bfcf9";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Fetch movies based on language and label
async function fetchMovies(language, label) {
  let allMovies = [];
  let page = 1;

  while (allMovies.length < 100 && page <= 5) {
    const url = `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}&with_original_language=${language}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allMovies = allMovies.concat(data.results);
      page++;
    } catch (error) {
      console.error(`Error fetching ${label} movies:`, error);
      return;
    }
  }

  displayMovies(allMovies.slice(0, 100), label);
}

// Display movies and attach click events
function displayMovies(movies, label) {
  const movieListElement = document.getElementById("movies-container");
  const movieHeading = document.getElementById("movie-heading");

  movieListElement.innerHTML = ''; // Clear previous content
  movieHeading.textContent = `${label} Movies`;

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750";

    movieItem.innerHTML = `
      <a onclick="playVideo('${movie.id}')" class="movie-link">
        <img src="${posterUrl}" alt="${movie.title}" />
        <h3 class="movie-title">${movie.title}</h3>
      </a>
    `;

    movieListElement.appendChild(movieItem);
  });
}

// Fetch and play video trailer for movies
async function playVideo(movieId) {
  const url = `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();

    if (data.results.length > 0) {
      const trailerKey = data.results[0].key;
      const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
      window.open(trailerUrl, '_blank'); // Open trailer in a new tab
    } else {
      alert("Trailer not available.");
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}

// Load movies on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies("en", "Hollywood"); // Default to Hollywood movies
});
