import './style.css'; 
import loadMovies from "./loadMovies.js";
import { loadMovieDetails } from "./loadMovieDetails.js";
export {displayMovieList, displayMovieDetails, searchList, movieSearchBox}



const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const addToFavoritesBtn = document.getElementById('add-to-favorites');


function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}


function displayMovieList(movies) {
    searchList.innerHTML = "";
    movies.forEach(movie => {
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movie.imdbID;
        movieListItem.classList.add('search-list-item');

        let moviePoster = (movie.Poster !== "N/A") ? movie.Poster : "assets/image_not_found.png";

        movieListItem.innerHTML = `
        <div class="search-item-thumbnail">
            <img src="${moviePoster}">
        </div>
        <div class="search-item-info">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        </div>
        `;

        searchList.appendChild(movieListItem);

        movieListItem.addEventListener("click", () => loadMovieDetails(movie.imdbID));
    });
}

const debounce = (fn, ms) =>{
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout=setTimeout(()=> fn(...args), ms)
    };
}

const debouncedFindMovies = debounce(findMovies, 500);
movieSearchBox.addEventListener('input', debouncedFindMovies);

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
        <div class="movie-poster">
            <img src="${(details.Poster != "N/A") ? details.Poster : "assets/image_not_found.png"}" alt="movie poster">
            <div class="add-to-favorites" id="add-to-favorites">
                <i class="fas fa-star"></i>
                <span>Добавить в избранное</span>
            </div>
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">Year: ${details.Year}</li>
                <li class="rated">Рейтинг:<br>${details.Rated}</li>
                <li class="released">Премьера:<br>${details.Released}</li>
            </ul>
            <p class="genre"><b>Жанр:</b> ${details.Genre}</p>
            <p class="writer"><b>Режиссер:</b> ${details.Writer}</p>
            <p class="actors"><b>Актеры:</b> ${details.Actors}</p>
            <p class="plot"><b>Сюжет:</b> ${details.Plot}</p>
            <p class="awards"><b><i class="fas fa-award"></i></b>${details.Awards}</p>
        </div>`;

    const addToFavoritesBtn = document.getElementById('add-to-favorites');
    
    addToFavoritesBtn.addEventListener('click', () => addToFavorites(details));
}

window.addEventListener('click', (event) => {
    if (!event.target.classList.contains('form-control')) {
        searchList.classList.add('hide-search-list');
    }
});

async function addToFavorites(movie) {
    try {
        const response = await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster
            })
        });

        const data = await response.json();
        alert(data.message);
    } catch (error) {
        console.error("Ошибка добавления в избранное:", error);
    }
}


