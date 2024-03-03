const express = require('express');
const app = express();

// Маршрут для кореневого шляху
app.get('/', (req, res) => {
    res.send('CyberBionic');
});

// Прослуховування порту 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено на порті ${PORT}`);
});
