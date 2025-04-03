import os
import time
import re
from datetime import datetime, timedelta

# Папка с файлами
folder_path = r'd:\q'

# Регулярное выражение для поиска даты в формате YYYY-MM-DD_HH-MM-SS
date_pattern = r'\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}'

# Получаем список файлов в папке
for filename in os.listdir(folder_path):
    file_path = os.path.join(folder_path, filename)

    # Исключаем файл скрипта из переименования
    if filename == 'rename_by_date.py':
        continue
    
    # Проверяем, является ли это файлом
    if os.path.isfile(file_path):
        # Получаем время последнего изменения файла (в UTC)
        modification_time = os.path.getmtime(file_path)

        # Преобразуем время в локальное время
        local_time = time.localtime(modification_time)

        # Преобразуем время в строку в формате "YYYY-MM-DD_HH-MM-SS"
        new_date = time.strftime('%Y-%m-%d_%H-%M-%S', local_time)
        
        # Если разница с Красноярским временем - 1 час, добавим 1 час
        # Увеличиваем на 1 час
        adjusted_time = datetime.strptime(new_date, '%Y-%m-%d_%H-%M-%S') + timedelta(hours=1)
        
        # Преобразуем отредактированное время обратно в строку
        new_date = adjusted_time.strftime('%Y-%m-%d_%H-%M-%S')

        # Если в имени файла уже есть дата, заменим её
        if re.search(date_pattern, filename):
            # Заменяем старую дату на новую
            new_filename = re.sub(date_pattern, new_date, filename)
        else:
            # Если даты нет, просто добавляем новую дату в начало имени файла
            file_extension = os.path.splitext(filename)[1]
            new_filename = new_date + file_extension
        
        # Путь для нового имени
        new_file_path = os.path.join(folder_path, new_filename)
        
        # Переименовываем файл
        os.rename(file_path, new_file_path)
        print(f"Переименован: {filename} -> {new_filename}")
