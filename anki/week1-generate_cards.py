import genanki

# 1. Модель для карточек
model = genanki.Model(
    1607392319,
    'JS Core Model',
    fields=[{'name': 'Question'}, {'name': 'Answer'}],
    templates=[{
        'name': 'Card',
        'qfmt': '{{Question}}<hr>{{type:Answer}}',
        'afmt': '{{FrontSide}}<hr id="answer">{{Answer}}',
    }]
)

# 2. Колода для недели 1
deck = genanki.Deck(
    2059400110,
    'Week 1: JavaScript Core (learn.javascript.ru)'
)

# 3. Карточки (20 штук)
cards = [
    ("Что делает bind()?", "Создаёт новую функцию с привязанным контекстом this и/или аргументами."),
    ("Как исправить потерю контекста в setTimeout?", "Использовать стрелочную функцию или bind."),
    ("Разница между call и apply?", "call принимает аргументы списком, apply — массивом."),
    ("Пример частичного применения через bind", "const sum = (a, b) => a + b; const addFive = sum.bind(null, 5);"),
    ("Что выведет код: `sayHi.bind({name: 'John'})()`?", "John (контекст привязан явно)."),
    ("Как bind связан с замыканиями?", "bind использует замыкания для сохранения контекста и аргументов."),
    ("Почему this теряется в методах объекта?", "Контекст определяется в момент вызова, а не объявления."),
    ("Как привязать контекст класса?", "Через bind в конструкторе или стрелочные методы."),
    ("Что такое 'каррирование'?", "Преобразование функции от многих аргументов в цепочку функций от одного."),
    ("Как bind помогает в SRP?", "Позволяет отделить привязку контекста от логики функции."),
]

# 4. Генерация файла
for q, a in cards:
    deck.add_note(genanki.Note(model=model, fields=[q, a]))

genanki.Package(deck).write_to_file('week1-javascript-core.apkg')
print("Файл .apkg создан!")