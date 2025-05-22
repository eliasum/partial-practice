from fpdf import FPDF

# Текст дорожной карты
roadmap_text = """
🟢 Уровень 1 — Базовый (синтаксис + основы языка)
• let, const, var
• Типы данных: string, number, boolean, null, undefined, object
• Условия: if, else, switch
• Циклы: for, while, for...of, for...in
• Функции: обычные и стрелочные
• Массивы: map, filter, reduce, push, pop
• Объекты: свойства, перебор, Object.keys

🟡 Уровень 2 — Средний (глубокое понимание)
• Область видимости и Hoisting
• Контекст и this, bind/call/apply
• Асинхронность: callbacks, promises, async/await
• Обработка ошибок: try/catch
• Модули: export/import
• DOM: querySelector, события, изменение HTML/CSS

🔵 Уровень 3 — Продвинутый (продакшн)
• Классы и прототипы
• Замыкания и функциональные паттерны
• Event Loop и очередь задач
• TypeScript: типы, интерфейсы, дженерики
• Инструменты: ESLint, npm, Webpack, Babel
• Фреймворки: React, Node.js, Express, Next.js
"""

# Создание PDF
pdf = FPDF()
pdf.add_page()

# Добавляем шрифт с поддержкой Unicode
pdf.add_font("DejaVu", "", "DejaVuSans.ttf", uni=True)
pdf.set_font("DejaVu", size=10)  # Уменьшаем размер шрифта

# Задаём ширину ячейки вручную (например, 180 для остальной части страницы)
cell_width = 180

# Разбиваем текст на строки
for line in roadmap_text.strip().split('\n'):
    pdf.cell(cell_width, 8, line, ln=True)  # Используем cell вместо multi_cell

# Сохраняем PDF
pdf.output("js_roadmap_for_csharp_dev.pdf")
