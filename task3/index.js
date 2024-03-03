const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    const { method, ip } = req;
    const timestamp = new Date().toISOString();
    const path = req.path;
    const logMessage = `${timestamp} - IP: ${ip} - METHOD: ${method} - PATH: ${path}\n`;

    const logFilePath = 'request.log';

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Помилка при записі до логу:', err);
        }
    });

    res.on('finish', () => {
        const { statusCode } = res;
        const responseLogMessage = `${timestamp} - IP: ${ip} - METHOD: ${method} - PATH: ${path} - STATUS: ${statusCode}\n`;

        fs.appendFile(logFilePath, responseLogMessage, (err) => {
            if (err) {
                console.error('Помилка при записі до логу:', err);
            }
        });
    });

    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
