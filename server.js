const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// =========================================================================
// СПИСОК ВАШИХ КОЛЛЕГ И ИХ ССЫЛОК ДЛЯ ОПЛАТЫ
// Каждый официант дает свою ссылку из Сбера/Т-Банка
// =========================================================================
const waiters = [
    {
        id: "1",
        name: "Анна",
        role: "Официант",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        payLink: "https://www.tbank.ru/me/vash_nik_1" // Ссылка Анны
    },
    {
        id: "2",
        name: "Иван",
        role: "Бармен",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        payLink: "https://www.tbank.ru/me/vash_nik_2" // Ссылка Ивана
    },
    {
        id: "3",
        name: "Максим",
        role: "Официант",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        payLink: "https://www.tbank.ru/me/vash_nik_3" // Ссылка Максима
    }
];

// Отдаем список официантов на фронтенд
app.get('/api/waiters', (req, res) => {
    // Отправляем список без секретных данных
    const publicWaiters = waiters.map(w => ({ id: w.id, name: w.name, role: w.role, avatar: w.avatar }));
    res.json(publicWaiters);
});

// Запрос на оплату конкретному официанту
app.post('/api/create-pay-link', (req, res) => {
    const { waiterId, amount } = req.body;

    // Ищем официанта по ID
    const waiter = waiters.find(w => w.id === waiterId);

    if (waiter && waiter.payLink) {
        res.json({ sbpUrl: waiter.payLink });
    } else {
        res.status(404).json({ error: "Официант не найден" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
