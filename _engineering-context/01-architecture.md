# Архитектура ПО

## Основные понятия
- **Слои приложения:**  
  - Presentation (UI) — взаимодействие с пользователем  
  - Business Logic — обработка данных, правила  
  - Data Access — работа с БД и внешними сервисами

- **Модули и компоненты:**  
  - Разделение кода на логически связанные части  
  - Обеспечение переиспользования и удобства поддержки

## Паттерны проектирования
- **MVC (Model-View-Controller):**  
  Разделение ответственности:  
  - Model — данные и логика  
  - View — отображение  
  - Controller — обработка ввода

- **SOLID-принципы:**  
  - S — Single Responsibility Principle  
  - O — Open/Closed Principle  
  - L — Liskov Substitution Principle  
  - I — Interface Segregation Principle  
  - D — Dependency Inversion Principle

- **SRP (Single Responsibility Principle):**  
  Каждый класс или модуль должен иметь одну причину для изменения.

## Архитектурные стили
- **Монолит:** все части в одном приложении  
- **Микросервисы:** множество сервисов с четкими API  
- **REST:** архитектурный стиль для взаимодействия через HTTP  
- **Event-Driven:** обмен сообщениями и событиями

## Ресурсы для изучения
- «Clean Architecture» — Роберт Мартин  
- «Grokking the System Design Interview» — Educative