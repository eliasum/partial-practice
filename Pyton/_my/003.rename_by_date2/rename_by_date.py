import os
import time
import re
from datetime import datetime, timedelta

# Папка с файлами
folder_path = r'd:\q'

# Регулярное выражение для поиска старой даты в формате YYYY.MM.DD или YYYY-MM-DD
date_pattern = r'\d{4}[./-]\d{2}[./-]\d{2}'

# Регулярное выражение для поиска даты в формате YYYY-MM-DD_HH-MM-SS в имени файла
current_date_pattern = r'^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_'

# Получаем список файлов в папке
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)

    # Исключаем файл скрипта из переименования
    if filename == 'rename_by_date.py':
        continue
    
    # Проверяем, является ли это файлом
    if os.path.isfile(file_path):
        # Если имя уже содержит дату в нужном формате, пропускаем его
        if re.match(current_date_pattern, filename):
            print(f"Имя файла уже соответствует формату: {filename}")
            continue
        
        # Получаем время последнего изменения файла
        modification_time = os.path.getmtime(file_path)

        # Преобразуем время в локальное время
        local_time = time.localtime(modification_time)

        # Преобразуем время в строку в формате "YYYY-MM-DD_HH-MM-SS"
        new_date = time.strftime('%Y-%m-%d_%H-%M-%S', local_time)
        
        # Добавляем 1 час к времени
        adjusted_time = datetime.strptime(new_date, '%Y-%m-%d_%H-%M-%S') + timedelta(hours=1)
        
        # Преобразуем отредактированное время обратно в строку
        new_date = adjusted_time.strftime('%Y-%m-%d_%H-%M-%S')

        # Убираем старую дату из имени файла
        new_filename = re.sub(date_pattern, '', filename)

        # Убираем лишние пробелы или символы после удаления даты
        new_filename = new_filename.strip()

        # Заменяем все двойные подчеркивания на одно
        new_filename = new_filename.replace('__', '_')

        # Если имя файла начинается с подчеркивания, убираем его
        if new_filename.startswith('_'):
            new_filename = new_filename[1:]

        # Получаем расширение файла
        file_extension = os.path.splitext(filename)[1]

        # Убедимся, что расширение не дублируется
        new_filename = new_filename.rstrip(file_extension)

        # Добавляем новую дату и расширение
        if new_filename:
            new_filename = new_date + "_" + new_filename + file_extension
        else:
            new_filename = new_date + file_extension
        
        # Путь для нового имени
        new_file_path = os.path.join(folder_path, new_filename)
        
        # Переименовываем файл
        os.rename(file_path, new_file_path)
        print(f"Переименован: {filename} -> {new_filename}")
