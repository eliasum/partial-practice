import os
from datetime import datetime
from bs4 import BeautifulSoup
import re

root_dir = "d:/eliasum/Документы/Archive/messages/162390962/"

MONTHS = {
    'янв': 1, 'фев': 2, 'мар': 3, 'апр': 4, 'май': 5, 'июн': 6,
    'июл': 7, 'авг': 8, 'сен': 9, 'окт': 10, 'ноя': 11, 'дек': 12
}

def parse_date(header_text):
    match = re.search(r'(\d{1,2})\s+(\w+)\s+(\d{4})\s+в\s+(\d{1,2}):(\d{2}):(\d{2})', header_text)
    if not match:
        return None
    day, month_str, year, hour, minute, second = match.groups()
    month = MONTHS.get(month_str.lower())
    if not month:
        return None
    return datetime(int(year), month, int(day), int(hour), int(minute), int(second))

messages = []
html_files = [f for f in os.listdir(root_dir)
              if f.lower().endswith('.html') and f.lower().startswith('messages')]

print(f"Найдено HTML-файлов: {len(html_files)}")

for idx, filename in enumerate(html_files, 1):
    filepath = os.path.join(root_dir, filename)
    try:
        with open(filepath, 'r', encoding='windows-1251') as f:
            soup = BeautifulSoup(f, 'html.parser')

        for msg_div in soup.find_all('div', class_='message'):
            msg_id = msg_div.get('data-id')

            # Заголовок с датой и автором
            header_div = msg_div.find('div', class_='message__header')
            if not header_div:
                continue
            header_text = header_div.get_text(strip=True)
            dt = parse_date(header_text)

            # Определяем автора, убираем фамилию (оставляем имя)
            raw_author = header_text.split(',')[0].strip() if ',' in header_text else ''
            if raw_author == 'Вы':
                author = 'Вы'
            else:
                # Берём только первое слово (имя)
                author = raw_author.split()[0] if raw_author else raw_author

            # Берём тело сообщения: это второй прямой div внутри .message
            divs = msg_div.find_all('div', recursive=False)
            if len(divs) < 2:
                continue
            content_div = divs[1]   # первый был заголовок, второй — текст

            # Удаляем технические блоки
            for tag in content_div.find_all(['div', 'span'], class_=['kludges', 'attachment']):
                tag.decompose()
            text = content_div.get_text('\n', strip=True)

            if dt:
                messages.append({
                    'datetime': dt,
                    'id': int(msg_id) if msg_id and msg_id.isdigit() else 0,
                    'author': author,
                    'text': text if text else '<вложение/пусто>'
                })

        if idx % 10 == 0:
            print(f"Обработано файлов: {idx}/{len(html_files)}")

    except Exception as e:
        print(f"Ошибка в файле {filename}: {e}")

print(f"Всего обработано файлов: {len(html_files)}. Найдено сообщений: {len(messages)}")

if messages:
    messages.sort(key=lambda x: (x['datetime'], x['id']))
    output_file = "chat_log_sorted.txt"
    with open(output_file, 'w', encoding='utf-8') as out:
        for m in messages:
            date_str = m['datetime'].strftime('%d.%m.%Y %H:%M:%S')
            out.write(f"[{date_str}] {m['author']}: {m['text']}\n")
    print(f"Готово! Файл: {output_file}")
else:
    print("Сообщения не найдены. Проверьте структуру HTML.")