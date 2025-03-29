import '../favorites_page/favorites_style.css';

document.addEventListener('DOMContentLoaded', async () => {
    const favoritesGrid = document.getElementById('favorites-grid');

    try {
        const response = await fetch('/api/favorites');
        const favorites = await response.json();

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
                     <div>
                        <h3 class="movie-title">${movie.Title}</h3>
                     </div>
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
                removeButton.addEventListener('click', async (event) => {
                    event.stopPropagation();
                    await removeFromFavorites(movie.imdbID);
                });
            });
        }
    } catch (error) {
        console.error('Ошибка загрузки избранных фильмов:', error);
        favoritesGrid.innerHTML = "<p>Ошибка загрузки избранного.</p>";
    }
});

async function removeFromFavorites(movieId) {
    try {
        const response = await fetch(`/api/favorites/${movieId}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Фильм удален из избранного!');
            location.reload();
        } else {
            const errorData = await response.json();
            alert(`Ошибка: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Ошибка удаления фильма:', error);
    }
}