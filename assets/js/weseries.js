const API_KEY = "ac01f8721680d7c05c829a2eba3bfcf9";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Fetch TV shows based on language and label
async function fetchMovies(language, label) {
  let allMovies = [];
  let page = 1;

  while (allMovies.length < 100 && page <= 5) {
    const url = `${TMDB_BASE_URL}/discover/tv?api_key=${API_KEY}&with_original_language=${language}&sort_by=popularity.desc&page=${page}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allMovies = allMovies.concat(data.results);
      page++;
    } catch (error) {
      console.error(`Error fetching ${label} TV shows:`, error);
      return;
    }
  }

  displayMovies(allMovies.slice(0, 100), label);
}

// Display TV shows and add clickable cards for videos
function displayMovies(movies, label) {
  const movieListElement = document.getElementById("movies-container");
  const movieHeading = document.getElementById("movie-heading");

  movieListElement.innerHTML = ''; // Clear previous content
  movieHeading.textContent = `${label} TV Shows`;

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750";

    movieItem.innerHTML = `
      <div class="movie-link" onclick="playVideo('${movie.id}', '${movie.name}')">
        <img src="${posterUrl}" alt="${movie.name}" />
        <h3 class="movie-title">${movie.name}</h3>
      </div>
    `;

    movieListElement.appendChild(movieItem);
  });
}

// Fetch and play video trailer or search on YouTube if unavailable
async function playVideo(tvId, tvName) {
  const url = `${TMDB_BASE_URL}/tv/${tvId}/videos?api_key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();

    if (data.results.length > 0) {
      const trailerKey = data.results[0].key;
      const trailerUrl = `https://www.youtube.com/watch?v=${trailerKey}`;
      window.open(trailerUrl, '_blank');
    } else {
      // Fallback: Search on YouTube
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(tvName)}+trailer`;
      window.open(searchUrl, '_blank');
    }
  } catch (error) {
    console.error("Error fetching trailer:", error);
  }
}

// Load Hollywood TV shows by default
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies("en", "Hollywood");
});
