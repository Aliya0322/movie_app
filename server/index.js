const express = require('express'); // Подключение Express
const path = require('path'); // Подключение Path — для безопасной работы с путями к файлам
const fs = require('fs'); //Модуль fs (file system) — для чтения/записи файлов на диске

const app = express(); //Создание экземпляра Express-приложения
const PORT = 3000;

const favoritesFile = path.join(__dirname, 'favorites.json'); //Абсолютный путь до файла favorites.json

// Загрузка начальных данных
let favorites = []; //создаём пустой массив, который будет хранить все фильмы, добавленные в избранное.
if (fs.existsSync(favoritesFile)) {
    favorites = JSON.parse(fs.readFileSync(favoritesFile, 'utf8')); //синхронно читает файл по указанному пути (в нашем случае — favorites.json)
}
//existsSync — это синхронный метод в Node.js, который проверяет, 
// существует ли файл или директория по указанному пути. Он возвращает true, если файл/директория существует, и false — если нет.

// Middleware
app.use(express.json()); //парсим JSON (для POST/PUT запросов)
app.use(express.static(path.join(__dirname, '../dist'))); //Указываем Express, что все статические файлы (JS, CSS, изображения) находятся в папке dist.

// API маршруты
app.get('/api/favorites', (req, res) => {
    res.json(favorites);
}); //Обработка GET-запроса по адресу /api/favorites. Отдаём весь массив избранного в формате JSON.

app.post('/api/favorites', (req, res) => {
    const movie = req.body; //Получаем тело запроса (объект фильма).
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) { //Проверяем, есть ли уже такой фильм в избранном.
        favorites.push(movie);
        fs.writeFileSync(favoritesFile, JSON.stringify(favorites, null, 2), 'utf8');
        res.status(201).json({ message: 'Фильм добавлен в избранное!' }); //Если нет — добавляем и сохраняем в файл.
    } else {
        res.status(400).json({ message: 'Фильм уже в избранном.' });
    }
});

app.delete('/api/favorites/:id', (req, res) => {
    const movieId = req.params.id; //Получаем id фильма из URL
    favorites = favorites.filter(movie => movie.imdbID !== movieId);
    fs.writeFileSync(favoritesFile, JSON.stringify(favorites, null, 2), 'utf8'); //Удаляем фильм из массива и перезаписываем файл (favorites — массив для сохранения, null — аргумент-заменитель, 2 — количество пробелов для отступов)
    res.json({ message: 'Фильм удален из избранного!' });
});

// Обрабатываем маршруты /main и /favorites
app.get(['/main', '/favorites'], (req, res) => {
    const file = req.path === '/favorites' ? 'favorites.html' : 'index.html';
    res.sendFile(path.join(__dirname, '../dist', file));
});

// Главная страница - отдаём index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Если ни один маршрут не сработал — отправляем сообщение об ошибке 404.
app.use((req, res) => {
    res.status(404).send("404: Page Not Found");
});

// Старт сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});




//node server/index.js запуск сервера
