'use strict';

/**
 * navbar variables
 */

const navOpenBtn = document.querySelector("[data-menu-open-btn]");
const navCloseBtn = document.querySelector("[data-menu-close-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");
const movies=document.getElementById("movies");




const API_KEY = "ac01f8721680d7c05c829a2eba3bfcf9"; 
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchUpcomingTamilMovies() {
  try {
    const response = await fetch(
       `${TMDB_BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ta&primary_release_year=2025&sort_by=release_date.asc`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayMovies(movies) {
  const movieListElement = document.getElementById("movies");

  if (!movieListElement) {
    console.error('Element with id "movies-container" not found.');
    return;
  }

  movieListElement.innerHTML = ""; // Clear previous content

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");

    const posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750"; // Fallback image

    movieItem.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}" />
      <h3 class="movie-title">${movie.title}</h3>
    `;

    movieListElement.appendChild(movieItem);
  });

  addStyle();
}

function addStyle() {
  const style = document.createElement("style");
  style.innerHTML = `
    .movie-title {
      color: white;
      font-size: 20px;
      text-align: center;
    }
    .movie-item img {
      width: 150px; /* Adjust width */
      height: auto; /* Maintain aspect ratio */
      border-radius: 8px;
    }
    .movie-item {
      text-align: center;
      margin: 10px;
    }
  `;
  document.head.appendChild(style);
}


document.addEventListener("DOMContentLoaded", () => fetchUpcomingTamilMovies());


/////// upcomig movies sytles






const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {

    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("active");

  });

}



/**
 * header sticky
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

  window.scrollY >= 10 ? header.classList.add("active") : header.classList.remove("active");

});



/**
 * go top
 */

const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  window.scrollY >= 500 ? goTopBtn.classList.add("active") : goTopBtn.classList.remove("active");

});
/////https://api.tvmaze.com/search/shows?q=girls
