const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Объект с MIME-типами
const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
};

// Маршруты страниц
const routes = {
    "/": "../index.html",
    "/main": "../index.html",
    "/favorites": "../favorites.html",
};

const server = http.createServer((req, res) => {
    console.log(`Запрос: ${req.url}`);

    // Убираем слэш в конце, если есть
    let urlPath = req.url.replace(/\/$/, "");

    // Игнорируем favicon.ico
    if (urlPath === "/favicon.ico") {
        res.writeHead(204, { "Content-Type": "image/x-icon" });
        return res.end();
    }

    let filePath;

    if (routes[urlPath]) {
        // Если это один из наших маршрутов, загружаем HTML
        filePath = path.join(__dirname, routes[urlPath]);
    } else {
        // Раздача статических файлов (CSS, JS, изображения и т. д.)
        filePath = path.join(__dirname, "..", urlPath);
    }

    // Определяем MIME-тип
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || "application/octet-stream";

    // Проверяем, существует ли файл
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("404: File Not Found");
        }

        // Читаем файл и отправляем клиенту
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("500: Internal Server Error");
            }
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, "localhost", (error) => {
    error ? console.log(error) : console.log(`Сервер запущен: http://localhost:${PORT}`);
});



//node server/index.js запуск сервера
