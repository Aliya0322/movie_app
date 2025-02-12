const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// Объект с MIME-типами для разных расширений файлов
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

const server = http.createServer((req, res) => {
    console.log("Server request received");
    console.log(req.url, req.method);

    // Игнорируем запросы к favicon.ico
    if (req.url === "/favicon.ico") {
        res.writeHead(204, { "Content-Type": "image/x-icon" });
        return res.end();
    }

    // Определяем путь к запрашиваемому файлу
    let filePath = path.join(__dirname, req.url === "/" ? "../index.html" : `../${req.url}`);

    // Определяем MIME-тип файла на основе его расширения
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || "application/octet-stream";

    // Читаем файл
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                // Файл не найден
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404: File Not Found");
            } else {
                // Другая ошибка сервера
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500: Internal Server Error");
            }
        } else {
            // Успешный ответ
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, "localhost", (error) => {
    error ? console.log(error) : console.log(`Listening on port ${PORT}`);
});

