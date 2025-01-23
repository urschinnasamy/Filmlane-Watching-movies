const API_KEY = "ac01f8721680d7c05c829a2eba3bfcf9"; 
const TMDB_BASE_URL = "https://api.themoviedb.org/3/discover/movie";

async function fetchSportsMovies() {
    const url = `${TMDB_BASE_URL}?api_key=${API_KEY}&with_genres=18,28&sort_by=popularity.desc`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        displayMovies(data.results, "Sports");
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}   

function displayMovies(movies, label) {
    const container = document.getElementById("movies-contain");
    const sport = document.getElementById("sport-head")
    sport.textContent = `${label}`;
    sport.style.textAlign = "center";

    movies.forEach(movie => {
        const div = document.createElement("div");
        div.className = "movie-item";

        div.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
        `;

        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", fetchSportsMovies);

function searchMovies() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const items = document.querySelectorAll(".movie-item");

    items.forEach(item => {
        const title = item.querySelector("h3").textContent.toLowerCase();
        item.style.display = title.includes(query) ? "block" : "none";
    });
}
