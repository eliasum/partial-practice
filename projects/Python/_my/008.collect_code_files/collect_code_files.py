import os
from datetime import datetime

# Папка, которую нужно просканировать
root_dir = "d:/Rep/partial-practice/JavaScript"  # <-- Заменить на нужный путь

# Расширения файлов, которые нас интересуют
code_extensions = (
    ".js", ".ts", ".py", ".cs", ".java", ".cpp", ".c", ".h", ".hpp",
    ".html", ".css", ".json", ".yaml", ".yml", ".xml", ".md"
)

# Папки для исключения из обхода
excluded_dirs = {".git", "node_modules"}

# Название выходного файла с датой
date_str = datetime.now().strftime("%Y-%m-%d")
output_file = f"code_dump_{date_str}.txt"

with open(output_file, "w", encoding="utf-8") as outfile:
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Исключаем нужные папки из обхода
        dirnames[:] = [d for d in dirnames if d not in excluded_dirs]

        for filename in filenames:
            if filename.lower().endswith(code_extensions):
                file_path = os.path.join(dirpath, filename)
                try:
                    with open(file_path, "r", encoding="utf-8") as infile:
                        outfile.write(f"\n--- Начало файла: {file_path} ---\n")
                        outfile.write(infile.read())
                        outfile.write(f"\n--- Конец файла: {file_path} ---\n\n")
                except Exception as e:
                    outfile.write(f"\n--- Ошибка при чтении: {file_path}. Пропущен. Ошибка: {e} ---\n")

print(f"Готово! Все кодовые файлы собраны в '{output_file}'")
