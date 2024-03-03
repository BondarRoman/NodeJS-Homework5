const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); // Middleware для обробки JSON тіла запиту

// Middleware для логування запитів
app.use((req, res, next) => {
    const { method, ip } = req;
    const timestamp = new Date().toISOString();
    const path = req.path;
    const logMessage = `${timestamp} - IP: ${ip} - METHOD: ${method} - PATH: ${path}\n`;

    // Шлях до файлу логу
    const logFilePath = 'request.log';

    // Запис до файлу логу
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Помилка при записі до логу:', err);
        }
    });

    next();
});

// Опрацювання решти запитів тут

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
