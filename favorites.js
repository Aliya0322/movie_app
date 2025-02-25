document.addEventListener('DOMContentLoaded', () => {
    const favoritesGrid = document.getElementById('favorites-grid');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesGrid.innerHTML = "<p>У вас пока нет избранных фильмов.</p>";
    } else {
        favorites.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('favorite-movie');
            movieElement.innerHTML = `
                <div class="movie-poster">
                    <img src="${movie.Poster}" alt="${movie.Title}">
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${movie.Title}</h3>
                    <ul class="movie-misc-info">
                        <li class="year">Год производства:<br>${movie.Year}</li>
                    </ul>
                    <button class="remove-from-favorites" data-id="${movie.imdbID}">Убрать из избранного</button>
                </div>`;
            favoritesGrid.appendChild(movieElement);

            movieElement.addEventListener("click", (event) => {
                if (!event.target.classList.contains('remove-from-favorites')) {
                    loadMovieDetails(movie.imdbID);
                }
            });

            const removeButton = movieElement.querySelector('.remove-from-favorites');
            removeButton.addEventListener('click', (event) => {
                event.stopPropagation(); 
                removeFromFavorites(movie.imdbID);
            });
        });
    }
});

function removeFromFavorites(movieId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(movie => movie.imdbID !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Фильм удален из избранного!');
    location.reload(); // Перезагружаем страницу для обновления списка избранных фильмов
}