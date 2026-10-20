const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // Раздаем index.html

// ЭНДПОИНТ: Создание платежа СБП
app.post('/api/create-pay-link', async (req, res) => {
    const { amount } = req.body;

    console.log(`Запрос на оплату чаевых: ${amount} руб.`);

    try {
        /* 
        =======================================================================
        ЗДЕСЬ ДОЛЖЕН БЫТЬ ЗАПРОС К ВАШЕМУ БАНКУ (Например, ЮKassa или Т-Банк)
        =======================================================================
        
        Пример для ЮKassa (псевдокод):
        const payment = await yooKassa.createPayment({
            amount: { value: amount, currency: "RUB" },
            payment_method_data: { type: "sbp" },
            confirmation: { type: "redirect", return_url: "https://vash-sayt.ru/thanks" }
        });
        const sbpUrl = payment.confirmation.confirmation_url;
        */

        // --- ДЕМО-РЕЖИМ (ТЕСТ) ---
        // НСПК тест-ссылка (В реальности банк вернет ссылку вида https://qr.nspk.ru/...)
        // Если открыть эту ссылку с телефона, откроется выбор банка!
        const mockSbpUrl = `https://qr.nspk.ru/BS10006318H288P88G3E000000000000?type=01&bank=100000000004&sum=${amount * 100}&cur=RUB&crc=E898`;

        // Возвращаем ссылку фронтенду
        res.json({ sbpUrl: mockSbpUrl });

    } catch (error) {
        console.error("Ошибка банка:", error);
        res.status(500).json({ error: "Не удалось создать платеж" });
    }
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});