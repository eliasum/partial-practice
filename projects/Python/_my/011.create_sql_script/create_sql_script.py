# 2025.09.29 15:19 IMM

# ОСНОВНАЯ ФУНКЦИЯ ПРОГРАММЫ
def main():
    # ОТКРЫВАЕМ ФАЙЛ ДЛЯ ЧТЕНИЯ
    # 'r' - режим чтения, encoding='utf-8' для русских букв
    file = open("ет.txt", "r", encoding="utf-8")

    # ЧИТАЕМ ВСЕ СТРОКИ ИЗ ФАЙЛА
    lines = file.readlines()

    # ЗАКРЫВАЕМ ФАЙЛ
    file.close()

    # СОЗДАЕМ НОВЫЙ ФАЙЛ ДЛЯ SQL-СКРИПТА
    # 'w' - режим записи (перезапишет файл если существует)
    sql_file = open("update_status_a.sql", "w", encoding="utf-8")

    # ПИШЕМ НАЧАЛО SQL-СКРИПТА
    sql_file.write("USE [hydra1]\nGO\n\n")

    # ПЕРЕМЕННАЯ ДЛЯ ПОДСЧЕТА СТРОК
    count = 0

    # ПРОХОДИМ ПО КАЖДОЙ СТРОКЕ В ФАЙЛЕ
    for line in lines:
        # УБИРАЕМ ЛИШНИЕ ПРОБЕЛЫ И ПЕРЕВОДЫ СТРОКИ
        clean_line = line.strip()

        # ПРОПУСКАЕМ ПУСТЫЕ СТРОКИ И ЗАГОЛОВОК
        if clean_line == "" or clean_line == "Единица транспортировки":
            continue  # переходим к следующей строке

        # ФОРМИРУЕМ SQL-ЗАПРОС ДЛЯ ОБНОВЛЕНИЯ
        # Устанавливаем status_a = 1 для текущего trans_einh
        sql_query = f"UPDATE [hydadm].[u_tpe_info] SET status_a = 1 WHERE trans_einh = '{clean_line}';\n"

        # ЗАПИСЫВАЕМ SQL-ЗАПРОС В ФАЙЛ
        sql_file.write(sql_query)

        # УВЕЛИЧИВАЕМ СЧЕТЧИК
        count += 1

        # ВЫВОДИМ ИНФОРМАЦИЮ О ТЕКУЩЕЙ ОБРАБОТАННОЙ СТРОКЕ
        print(f"Добавлен запрос для: {clean_line}")

    # ЗАКРЫВАЕМ SQL-ФАЙЛ
    sql_file.close()

    # ВЫВОДИМ ИТОГИ РАБОТЫ
    print("\n" + "=" * 50)
    print("SQL-СКРИПТ УСПЕШНО СОЗДАН!")
    print(f"Обработано записей: {count}")
    print("Создан файл: update_status_a.sql")
    print("=" * 50)
    print("\nИНСТРУКЦИЯ:")
    print("1. Откройте SQL Server Management Studio")
    print("2. Подключитесь к базе данных hydra1")
    print("3. Откройте файл update_status_a.sql")
    print("4. Выполните скрипт (нажмите F5)")


# ЗАПУСКАЕМ ОСНОВНУЮ ФУНКЦИЮ ПРИ ПРЯМОМ ЗАПУСКЕ ФАЙЛА
if __name__ == "__main__":
    main()
