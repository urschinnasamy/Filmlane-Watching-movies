const API_KEY = "ac01f8721680d7c05c829a2eba3bfcf9"; // Replace with your TMDb API key
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Function to fetch movies from each region (industry) based on the selected language
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
      console.error(`Error fetching ${label} movies:`, error);
      return;
    }
  }

  displayMovies(allMovies.slice(0, 100), label);
}

function displayMovies(movies, label) {
  const movieListElement = document.getElementById("movies-container");
  const movieHeading = document.getElementById("movie-heading");
  movieListElement.innerHTML = ''; // Clear previous content
  movieHeading.textContent = `${label}`;

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750"; // Fallback image

    movieItem.innerHTML = `
      <img src="${posterUrl}" alt="${movie.name}" />
      <h3 class="movie-title">${movie.name}</h3>
    `;

    movieListElement.appendChild(movieItem);
  });
}


// Function to handle the language change from the dropdown and fetch respective movies
function fetchMoviesByLanguage() {
  const language = document.getElementById("languageSelector").value;
  let label = "";

  switch (language) {
    case 'en':
      label = "Hollywood";
      break;
    case 'hi':
      label = "Bollywood";
      break;
    case 'te':
      label = "Tollywood";
      break;
    case 'ta':
      label = "Kollywood";
      break;
    case 'kn':
      label = "Sandalwood";
      break;
    case 'pa':
      label = "Pollywood";
      break;
    case 'ml':
      label = "Mollywood";
      break;
    case 'or':
      label = "Ollywood";
      break;
    default:
      label = "Movies";
  }

  fetchMovies(language, label); // Fetch movies based on the selected language
}

// Event listener to load the data when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchMovies("en", "Hollywood");  // Default to Hollywood movies on page load
});
