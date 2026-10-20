const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// =========================================================================
// СПИСОК ВАШИХ КОЛЛЕГ / ОФИЦИАНТОВ
// Чтобы добавить нового сотрудника — просто скопируйте и вставьте новый блок {}
// =========================================================================
const waiters = [
    {
        id: "1",
        name: "Анна",
        role: "Официант",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
        payLink: "https://www.tbank.ru/rm/vash_nik_1" // <--- Замените на реальную ссылку Анны
    },
    {
        id: "2",
        name: "Иван",
        role: "Бармен",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        payLink: "https://www.sberbank.ru/me/" // <--- Замените на реальную ссылку Ивана
    },
    {
        id: "3",
        name: "Максим",
        role: "Официант",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
        payLink: "https://messenger.sbrf.ru/sl/bPn3DUnTMm7kl030T" // <--- Замените на реальную ссылку Максима
    }
];

// 1. Отправляем список сотрудников на сайт
app.get('/api/waiters', (req, res) => {
    const publicWaiters = waiters.map(w => ({
        id: w.id,
        name: w.name,
        role: w.role,
        avatar: w.avatar
    }));
    res.json(publicWaiters);
});

// 2. Обрабатываем выбор сотрудника и отдаем его ссылку на оплату
app.post('/api/create-pay-link', (req, res) => {
    const { waiterId, amount } = req.body;

    // Находим сотрудника по его ID
    const waiter = waiters.find(w => w.id === waiterId);

    if (waiter && waiter.payLink) {
        console.log(`Запрос чаевых на сумму ${amount} руб. для: ${waiter.name}`);
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
app.listen(PORT, () => {
    console.log(`Сервер успешно запущен на порту ${PORT}`);
});
