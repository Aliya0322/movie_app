const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

// Подключение API
async function loadMovies(searchTerm){
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=e15683b`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data.Response === "True") {
        displayMovieList(data.Search);
    } else {
        console.error("Фильмы не найдены");
    }
}


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

        let moviePoster = (movie.Poster !== "N/A") ? movie.Poster : "image_not_found.png";

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

async function loadMovieDetails(movieId){
    searchList.classList.add('hide-search-list');
    movieSearchBox.value = "";
    const result = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=e15683b`);
    const movieDetails = await result.json();
    displayMovieDetails(movieDetails);
}

function displayMovieDetails(details) {
    resultGrid.innerHTML = `<div class="movie-poster">
                        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
                        <div class="add-to-favorites" id="add-to-favorites">
                            <i class="fas fa-star"></i>
                            <span>Добавить в избранное</span>
                        </div>
                    </div>
                    <div class = "movie-info">
                        <h3 class = "movie-title">${details.Title}</h3>
                        <ul class = "movie-misc-info">
                            <li class = "year">Year: ${details.Year}</li>
                            <li class = "rated">Рейтинг:<br>${details.Rated}</li>
                            <li class = "released">Премьера:<br>${details.Released}</li>
                        </ul>
                        <p class = "genre"><b>Жанр:</b> ${details.Genre}</p>
                        <p class = "writer"><b>Режиссер:</b> ${details.Writer}</p>
                        <p class = "actors"><b>Актеры: </b> ${details.Actors}</p>
                        <p class = "plot"><b>Сюжет:</b> ${details.Plot}</p>
                        <p class = "awards"><b><i class = "fas fa-award"></i></b>${details.Awards}</p>
                    </div>`;

    const addToFavoritesBtn = document.getElementById('add-to-favorites');
    addToFavoritesBtn.addEventListener('click', () => addToFavorites(details));
}

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.Title} добавлен в избранное!`);
    } else {
        alert(`${movie.Title} уже в избранном!`);
    }
}

window.addEventListener('click', (event) => {
    if (!event.target.classList.contains('form-control')) {
        searchList.classList.add('hide-search-list');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const favoritesGrid = document.getElementById('favorites-grid');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = "<p>У вас пока нет избранных фильмов.</p>";
    } else {
        favorites.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('favorite-movie');
            movieElement.innerHTML = `<div class="favorite-movie">
                    <div class="movie-poster">
                        <img src="${movie.Poster}" alt="${movie.Title}">
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.Title}</h3>
                        <ul class="movie-misc-info">
                            <li class="year">Год производства:<br>${movie.Year}</li>
                        </ul>
                    </div>`;
            favoritesGrid.appendChild(movieElement);
            movieElement.addEventListener("click", () => loadMovieDetails(movie.imdbID));
        });
    }
});
