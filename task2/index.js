const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/form');
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n`;

    const filePath = 'contacts.txt';

    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Помилка при записі даних:', err);
            res.status(500).send('Помилка при обробці запиту');
        } else {
            console.log('Дані успішно записані до файлу');
            res.send('Дані успішно відправлені');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
