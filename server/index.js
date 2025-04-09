const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const favoritesFile = path.join(__dirname, 'favorites.json');

// Загрузка начальных данных
let favorites = [];
if (fs.existsSync(favoritesFile)) {
    favorites = JSON.parse(fs.readFileSync(favoritesFile, 'utf8'));
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// API маршруты
app.get('/api/favorites', (req, res) => {
    res.json(favorites);
});

app.post('/api/favorites', (req, res) => {
    const movie = req.body;
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        fs.writeFileSync(favoritesFile, JSON.stringify(favorites, null, 2), 'utf8');
        res.status(201).json({ message: 'Фильм добавлен в избранное!' });
    } else {
        res.status(400).json({ message: 'Фильм уже в избранном.' });
    }
});

app.delete('/api/favorites/:id', (req, res) => {
    const movieId = req.params.id;
    favorites = favorites.filter(movie => movie.imdbID !== movieId);
    fs.writeFileSync(favoritesFile, JSON.stringify(favorites, null, 2), 'utf8');
    res.json({ message: 'Фильм удален из избранного!' });
});

// здесь отдаём HTML из dist
app.get(['/main', '/favorites'], (req, res) => {
    const file = req.path === '/favorites' ? 'favorites.html' : 'index.html';
    res.sendFile(path.join(__dirname, '../dist', file));
});

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.use((req, res) => {
    res.status(404).send("404: Page Not Found");
});

// Старт сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});




//node server/index.js запуск сервера
