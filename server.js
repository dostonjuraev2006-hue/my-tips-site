const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// =========================================================================
// СПИСОК СОТРУДНИКОВ
// =========================================================================
const waiters = [
    {
        id: "1",
        name: "Достон", // Ваше имя (первый сотрудкник)
        role: "Официант",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        payLink: "https://messenger.sbrf.ru/sl/bPn3DUnTMm7kl030T" // <--- ВАША РЕАЛЬНАЯ ССЫЛКА СБЕРБАНКА
    },
    {
        id: "2",
        name: "Иван",
        role: "Бармен",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        payLink: "https://messenger.sbrf.ru/sl/bPn3DUnTMm7kl030T" // Замените на ссылку коллега, когда он её пришлет
    },
    {
        id: "3",
        name: "Анна",
        role: "Официант",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        payLink: "https://messenger.sbrf.ru/sl/bPn3DUnTMm7kl030T" // Замените на ссылку коллеги, когда она её пришлет
    }
];

// 1. Получение списка сотрудников
app.get('/api/waiters', (req, res) => {
    const publicWaiters = waiters.map(w => ({
        id: w.id,
        name: w.name,
        role: w.role,
        avatar: w.avatar
    }));
    res.json(publicWaiters);
});

// 2. Получение ссылки на оплату СБП
app.post('/api/create-pay-link', (req, res) => {
    const { waiterId, amount } = req.body;

    const waiter = waiters.find(w => w.id === waiterId);

    if (waiter && waiter.payLink) {
        console.log(`Запрос чаевых для ${waiter.name} на сумму ${amount} руб.`);
        res.json({ sbpUrl: waiter.payLink });
    } else {
        res.status(404).json({ error: "Сотрудник не найден" });
    }
});

// Главная страница
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
