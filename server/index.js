const http = require("http");
const fs = require("fs"); //Модуль fs для работы с файлами
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log("Server request received");
    console.log(req.url, req.method);

    // Путь к index.html
    const filePath = path.join(__dirname, "index.html");

    // Читаем файл index.html
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Ошибка сервера");
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data); // Отправляем содержимое index.html
        }
    });
});

server.listen(PORT, "localhost", (error) => {
    error ? console.log(error) : console.log(`Listening on port ${PORT}`);
});

