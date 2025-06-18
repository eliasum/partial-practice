# Безопасность

## Основы
- **HTTPS, SSL/TLS:**  
  Шифрование трафика для защиты данных

- **Аутентификация и авторизация:**  
  - JWT (JSON Web Token)  
  - OAuth2 — протокол авторизации

## Веб-уязвимости
- **CORS (Cross-Origin Resource Sharing):**  
  Политика браузера, ограничивающая запросы между разными доменами

- **XSS (Cross-site scripting):**  
  Внедрение вредоносного скрипта в страницу

- **CSRF (Cross-site request forgery):**  
  Подделка запросов от доверенного пользователя

- **SQL-инъекции:**  
  Внедрение вредоносных SQL-команд через ввод

## Лучшие практики
- Хранение паролей с хешированием (bcrypt)  
- Использование Content Security Policy (CSP)  
- Валидация и экранирование входных данных

```markdown
## CORS на практике
Пример настройки CORS в Node.js (Express):
```javascript
// projects/nodejs/rest-api/index.js
const express = require('express');
const app = express();

// Разрешаем запросы только с https://your-frontend.com
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://your-frontend.com');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/tasks', (req, res) => {
  res.json([{ id: 1, text: "Learn CORS" }]);
});

## Ресурсы
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)  
- [PortSwigger Academy](https://portswigger.net/web-security)