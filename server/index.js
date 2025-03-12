const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const favoritesFile = path.join(__dirname, 'favorites.json');


app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));


if (fs.existsSync(favoritesFile)) {
    favorites = JSON.parse(fs.readFileSync(favoritesFile, 'utf8'));
}

// Функция для сохранения избранного в файл JSON
function saveFavorites() {
    fs.writeFileSync(favoritesFile, JSON.stringify(favorites, null, 2), 'utf8');
}

// Относительные пути
const routes = {
    "/": "main_page/index.html",
    "/main": "main_page/index.html",
    "/favorites": "favorites_page/favorites.html",
};

// Обработываем маршрут
app.get(Object.keys(routes), (req, res) => {
    const routePath = routes[req.path]; 
    if (routePath) {
        res.sendFile(path.join(__dirname, '..', routePath));
    } else {
        res.status(404).send("404: Page Not Found");
    }
});

// Получаем список избранных фильмов
app.get('/api/favorites', (req, res) => {
    res.json(favorites);
});

// Добавляем фильм в избранное
app.post('/api/favorites', (req, res) => {
    const movie = req.body;
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        saveFavorites(); 
        res.status(201).json({ message: 'Фильм добавлен в избранное!' });
    } else {
        res.status(400).json({ message: 'Фильм уже в избранном.' });
    }
});

// Удаляем фильм из избранного
app.delete('/api/favorites/:id', (req, res) => {
    const movieId = req.params.id;
    favorites = favorites.filter(movie => movie.imdbID !== movieId);
    saveFavorites(); 
    res.json({ message: 'Фильм удален из избранного!' });
});

// Ошибка 404
app.use((req, res) => {
    res.status(404).send("404: Page Not Found");
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});




//node server/index.js запуск сервера
