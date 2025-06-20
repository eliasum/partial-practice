# Engineering Context

Этот репозиторий содержит систематизированные знания по ключевым темам инженерного контекста в сфере разработки программного обеспечения. Материалы ориентированы на практиков, желающих укрепить фундаментальные знания и научиться принимать более осознанные технические решения.

## 📚 Содержание

- [01. Архитектура ПО](#01-архитектура-по)
- [02. Безопасность](#02-безопасность)
- [03. Протоколы и стандарты](#03-протоколы-и-стандарты)
- [04. HTTP-инфраструктура](#04-http-инфраструктура)
- [05. Производительность](#05-производительность)
- [06. Хранение данных](#06-хранение-данных)
- [07. CI/CD и DevOps](#07-cicd-и-devops)
- [08. Тестирование](#08-тестирование)
- [09. Системное мышление](#09-системное-мышление)
- [🧠 Anki-карточки](#anki-карточки)

---

## 01. Архитектура ПО

### Основные понятия
- **Слои приложения:** UI, бизнес-логика, доступ к данным
- **Модули и компоненты:** разделение и повторное использование

### Паттерны проектирования
- **MVC:** Model, View, Controller
- **SOLID-принципы**
- **SRP:** одна причина для изменения

### Архитектурные стили
- Монолит, Микросервисы, REST, Event-Driven

### Ресурсы
- _Clean Architecture_, Роберт Мартин  
- _Grokking the System Design Interview_, Educative

---

## 02. Безопасность

### Основы
- Аутентификация и авторизация
- OWASP Top 10

### Практики
- HTTPS, CSP, CORS
- Хэширование паролей (bcrypt)
- Защита API-ключей

---

## 03. Протоколы и стандарты

### Уровни модели OSI
- Канальный, сетевой, транспортный, прикладной

### Протоколы
- TCP, UDP, HTTP/HTTPS, WebSocket

### Стандарты
- MIME, JSON, XML, JWT, OAuth2

---

## 04. HTTP-инфраструктура

### Базовые понятия
- Методы HTTP, коды ответов, заголовки

### Сервера и прокси
- Nginx, Apache, CDN, кэширование

### Безопасность и оптимизация
- TLS, gzip, rate limiting

---

## 05. Производительность

### Метрики
- Latency, Throughput, RPS

### Оптимизация
- Кэширование, CDN, асинхронность, профилирование

### Подходы
- P99, Load testing, Bottleneck analysis

---

## 06. Хранение данных

### Типы БД
- Реляционные (PostgreSQL), NoSQL (MongoDB, Redis)

### Индексы и запросы
- Explain, JOINs, агрегаты

### Хранилища
- Объектные (S3), файловые

---

## 07. CI/CD и DevOps

### Практики
- GitHub Actions, GitLab CI, Docker, Kubernetes

### Мониторинг и логгинг
- Prometheus, Grafana, ELK

### Инфраструктура как код
- Terraform, Ansible

---

## 08. Тестирование

### Типы тестов
- Unit, Integration, E2E

### Инструменты
- Jest, Mocha, Selenium, Postman

### Стратегии
- TDD, тест-пирамиды, flaky tests

---

## 09. Системное мышление

### Что это такое
- Восприятие системы как целого

### Управление сложностью
- Подсистемы, зависимости, границы

### Компромиссы и решения
- Производительность vs удобство поддержки

---

## 🧠 Anki-карточки

В папке `anki/` находятся экспортированные `.apkg`-файлы с карточками для повторения ключевых понятий.

```bash
anki/
├── week1-javascript-core.apkg   # Пример карточек (по запросу)
└── README.md                    # Инструкция по установке
```

### Как использовать:
1. Установите [Anki](https://apps.ankiweb.net/)
2. Импортируйте файл `.apkg`
3. Используйте интервальные повторения

---

## 📆 Рекомендованный порядок изучения

| Неделя | Тема                       |
|--------|----------------------------|
| 1      | Архитектура ПО             |
| 2      | Протоколы и HTTP-инфраструктура |
| 3      | Безопасность               |
| 4      | CI/CD и DevOps             |
| 5      | Хранение данных            |
| 6      | Производительность         |
| 7      | Тестирование               |
| 8      | Системное мышление         |

---

_Подготовлено в рамках структурирования инженерного контекста. Актуализируйте и дополняйте по мере роста компетенции._