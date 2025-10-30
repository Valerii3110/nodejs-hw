Мета
Створити мінімальний бекенд-додаток на базі Express.js для роботи з колекцією нотаток.
Розібратись із базовими поняттями: маршрути, middleware, логування, обробка помилок і деплой на Render.

Запуск проєкту
1️⃣ Клонування репозиторію
git clone https://github.com/<your-username>/nodejs-hw.git
cd nodejs-hw
git checkout 01-express

2️⃣ Встановлення залежностей
npm install

3️⃣ Створення .env
У корені проєкту створіть файл .env з такою змінною:
PORT=3000

4️⃣ Запуск сервера
Режим розробки (з nodemon):
npm run dev

Режим продакшн:
npm start

📁 Структура проєкту
nodejs-hw/
├─ .env
├─ .gitignore
├─ .prettierrc
├─ .eslintrc.json
├─ package.json
└─ src/
└─ server.js

⚙️ Використані технології
ПакетПризначенняexpressОсновний фреймворк для створення сервераcorsДозвіл запитів із зовнішніх доменівdotenvПідвантаження змінних оточенняpino-httpHTTP-логер для ExpressnodemonАвтоматичний перезапуск сервера під час розробкиeslint + prettierЛінтинг і форматування коду

🔀 Реалізовані маршрути
GET /notes

Повертає всі нотатки

Відповідь:
{
"message": "Retrieved all notes"
}

GET /notes/:noteId

Повертає одну нотатку за ID

Приклад запиту:
GET /notes/123

Відповідь:
{
"message": "Retrieved note with ID: 123"
}

GET /test-error

Імітує помилку сервера

Відповідь:
{
"message": "Simulated server error"
}

Обробка помилок
СитуаціяСтатусВідповідьНеіснуючий маршрут404{ "message": "Route not found" }Внутрішня помилка500{ "message": "<текст помилки>" }

Перевірка запитів через cURL

# Усі нотатки

curl http://localhost:3000/notes

# Нотатка за ID

curl http://localhost:3000/notes/42

# Тестова помилка

curl http://localhost:3000/test-error

# Невідомий маршрут

curl http://localhost:3000/unknown

🧑‍💻 Автор
Валерій Залецький
📂 GitHub
🌐 Render App
