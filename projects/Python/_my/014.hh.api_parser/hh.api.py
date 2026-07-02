import requests
from bs4 import BeautifulSoup
import pandas as pd
import time
import random
import re
from collections import Counter
import matplotlib.pyplot as plt
import matplotlib
matplotlib.use('Agg')

# Для цветного вывода
try:
    from colorama import Fore, Back, Style, init
    init(autoreset=True)
    COLOR_ENABLED = True
except ImportError:
    COLOR_ENABLED = False
    # Определяем заглушки
    class Fore:
        GREEN = ''; RED = ''; YELLOW = ''; CYAN = ''; WHITE = ''; LIGHTGREEN_EX = ''; LIGHTCYAN_EX = ''; LIGHTWHITE_EX = ''; BLUE = ''; MAGENTA = ''
    class Back:
        BLUE = ''; GREEN = ''
    class Style:
        BRIGHT = ''; RESET_ALL = ''

def print_header(text):
    if COLOR_ENABLED:
        print("\n" + Back.BLUE + Fore.WHITE + Style.BRIGHT + " " + text + " " + Style.RESET_ALL)
    else:
        print("\n" + "=" * 80)
        print(text)
        print("=" * 80)

def print_success(text):
    if COLOR_ENABLED:
        print(Fore.GREEN + Style.BRIGHT + "✅ " + text)
    else:
        print("[OK] " + text)

def print_error(text):
    if COLOR_ENABLED:
        print(Fore.RED + Style.BRIGHT + "❌ " + text)
    else:
        print("[ERR] " + text)

def print_info(text):
    if COLOR_ENABLED:
        print(Fore.YELLOW + "ℹ️  " + text)
    else:
        print("[INFO] " + text)

def print_warning(text):
    if COLOR_ENABLED:
        print(Fore.LIGHTMAGENTA_EX + "⚠️  " + text)
    else:
        print("[WARN] " + text)

def print_progress(iteration, total, prefix='', suffix='', length=30):
    percent = 100 * iteration / total
    filled = int(length * iteration // total)
    bar = '█' * filled + '-' * (length - filled)
    if COLOR_ENABLED:
        print(f'\r{Fore.YELLOW}{prefix} |{Fore.GREEN}{bar}{Fore.YELLOW}| {Fore.LIGHTCYAN_EX}{percent:.1f}% {suffix}', end='')
    else:
        print(f'\r{prefix} |{bar}| {percent:.1f}% {suffix}', end='')
    if iteration == total:
        print()

# ==================== ПАРСИНГ ДЕТАЛЕЙ ВАКАНСИИ ====================

def parse_vacancy_details(url):
    """Открывает страницу вакансии и извлекает описание, требования, обязанности и навыки."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    }
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        if resp.status_code != 200:
            return "", "", "", ""

        soup = BeautifulSoup(resp.text, "html.parser")

        # Описание
        description = ""
        desc_block = soup.find("div", {"data-qa": "vacancy-description"})
        if desc_block:
            description = desc_block.text.strip()

        # Требования
        requirements = ""
        req_block = soup.find("div", {"data-qa": "vacancy-requirements"})
        if req_block:
            requirements = req_block.text.strip()
        if not requirements and description:
            # Попытка вычленить требования по ключевым словам
            match = re.search(r'(?:Требования|Необходимые навыки|Мы ждём|Мы ищем)[\s:]+(.+?)(?:\n\n|$)', description, re.IGNORECASE | re.DOTALL)
            if match:
                requirements = match.group(1).strip()

        # Обязанности
        responsibilities = ""
        resp_block = soup.find("div", {"data-qa": "vacancy-responsibilities"})
        if resp_block:
            responsibilities = resp_block.text.strip()
        if not responsibilities and description:
            match = re.search(r'(?:Обязанности|Чем предстоит заниматься|Что нужно делать)[\s:]+(.+?)(?:\n\n|$)', description, re.IGNORECASE | re.DOTALL)
            if match:
                responsibilities = match.group(1).strip()

        # Навыки
        skills = ""
        skills_block = soup.find("div", {"data-qa": "skills-section"})
        if skills_block:
            skills = skills_block.text.strip()

        if not description:
            main_content = soup.find("div", {"data-qa": "vacancy-view-content"})
            if main_content:
                description = main_content.text.strip()

        return description, requirements, responsibilities, skills

    except Exception as e:
        return "", "", "", ""

# ==================== ОСНОВНОЙ ПАРСЕР ====================

def parse_hh_vacancies_full(query, num_pages=3, area=113, max_vacancies=None):
    """
    Парсер вакансий с полной детализацией.
    :param query: поисковый запрос
    :param num_pages: количество страниц поиска (если max_vacancies не задано)
    :param area: код региона
    :param max_vacancies: максимальное количество собираемых вакансий (если задано, num_pages игнорируется)
    """
    base_url = "https://hh.ru/search/vacancy"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    }

    all_vacancies = []
    total_found = 0

    # Определим реальное количество страниц, если хотим ограничить по количеству вакансий
    if max_vacancies:
        # Сначала получим первую страницу, чтобы узнать общее количество
        params_first = {"text": query, "page": 0, "items_on_page": 50, "area": area}
        resp_first = requests.get(base_url, headers=headers, params=params_first)
        if resp_first.status_code == 200:
            soup_first = BeautifulSoup(resp_first.text, "html.parser")
            # Попытка найти общее количество
            total_text = soup_first.find("h1", {"data-qa": "title"})
            if total_text:
                match = re.search(r'(\d+)', total_text.text)
                if match:
                    total_found = int(match.group(1))
        if total_found == 0:
            total_found = 1000  # запасное значение
        pages_needed = min(num_pages, (total_found + 49) // 50)
        if pages_needed == 0:
            pages_needed = 1
    else:
        pages_needed = num_pages

    print_info(f"Будет обработано страниц: {pages_needed} (всего найдено ~{total_found} вакансий)")

    for page in range(pages_needed):
        params = {
            "text": query,
            "page": page,
            "items_on_page": 50,
            "area": area
        }
        print_info(f"Загрузка страницы {page+1} из {pages_needed}...")
        response = requests.get(base_url, headers=headers, params=params)
        if response.status_code != 200:
            print_error(f"Ошибка {response.status_code} на странице {page+1}")
            continue

        soup = BeautifulSoup(response.text, "html.parser")
        vacancy_items = soup.select("div[data-qa='vacancy-serp__vacancy']")
        if not vacancy_items:
            print_error(f"На странице {page+1} не найдено карточек. Возможно, структура изменилась или сайт вернул капчу.")
            break

        print_info(f"Найдено {len(vacancy_items)} карточек на странице {page+1}")

        for idx, item in enumerate(vacancy_items, 1):
            try:
                title_elem = item.select_one("a[data-qa='serp-item__title']")
                if not title_elem:
                    continue
                title = title_elem.text.strip()
                link = title_elem.get("href")
                if link and not link.startswith("http"):
                    link = "https://hh.ru" + link

                salary_elem = item.select_one("span[data-qa='vacancy-serp__vacancy-compensation']")
                salary = salary_elem.text.strip() if salary_elem else "Не указана"

                company_elem = item.select_one("a[data-qa='vacancy-serp__vacancy-employer']")
                company = company_elem.text.strip() if company_elem else "Не указана"

                location_elem = item.select_one("span[data-qa='vacancy-serp__vacancy-address']")
                location = location_elem.text.strip() if location_elem else "Не указан"

                print_progress(idx, len(vacancy_items), prefix=f'Обработка карточки {idx}/{len(vacancy_items)}')

                description, requirements, responsibilities, skills = parse_vacancy_details(link)

                all_vacancies.append({
                    "Название": title,
                    "Компания": company,
                    "Локация": location,
                    "Зарплата": salary,
                    "Описание": description,
                    "Требования": requirements,
                    "Обязанности": responsibilities,
                    "Навыки": skills,
                    "Ссылка": link
                })

                # Если достигли лимита, прерываем
                if max_vacancies and len(all_vacancies) >= max_vacancies:
                    print_info(f"Достигнут лимит {max_vacancies} вакансий, остановка.")
                    break

                time.sleep(random.uniform(0.5, 1.2))

            except Exception as e:
                print_error(f"Ошибка при обработке карточки: {e}")
                continue

        if max_vacancies and len(all_vacancies) >= max_vacancies:
            break

        time.sleep(random.uniform(1.5, 3))

    return pd.DataFrame(all_vacancies)

# ==================== АНАЛИЗ ====================

def analyze_vacancies(df):
    if df.empty:
        print_error("Нет данных для анализа.")
        return

    print_header("📊 АНАЛИЗ СОБРАННЫХ ДАННЫХ")
    print_success(f"Всего вакансий: {len(df)}")
    print_info(f"Уникальных компаний: {df['Компания'].nunique()}")
    print_info(f"Уникальных городов: {df['Локация'].nunique()}")

    print("\n" + "🏙️ Топ-10 городов:")
    city_counts = df['Локация'].value_counts().head(10)
    for i, (city, cnt) in enumerate(city_counts.items(), 1):
        print(f"  {i:2}. {city:30} – {cnt}")

    print("\n" + "🏢 Топ-10 компаний:")
    company_counts = df['Компания'].value_counts().head(10)
    for i, (comp, cnt) in enumerate(company_counts.items(), 1):
        print(f"  {i:2}. {comp:30} – {cnt}")

    # Анализ технологий
    all_text = ' '.join(df['Описание'].fillna('') + ' ' + df['Требования'].fillna('') + ' ' + df['Обязанности'].fillna('')).lower()
    tech_keywords = [
        '.net core', '.net 8', '.net 9', 'asp.net core', 'c#',
        'postgresql', 'docker', 'kubernetes', 'k8s', 'rabbitmq', 'kafka',
        'redis', 'mongodb', 'entity framework', 'ef core', 'dapper',
        'rest api', 'web api', 'grpc', 'ci/cd', 'jenkins', 'gitlab ci',
        'github actions', 'gitflow', 'microservices', 'микросервисы',
        'async', 'асинхронный', 'xunit', 'nunit', 'moq', 'unit-тесты',
        'prometheus', 'grafana', 'opensearch', 'elasticsearch',
        'linux', 'bash', 'helm', 'terraform'
    ]

    tech_counts = {}
    for tech in tech_keywords:
        count = all_text.count(tech)
        if count > 0:
            tech_counts[tech] = count

    if tech_counts:
        sorted_tech = sorted(tech_counts.items(), key=lambda x: x[1], reverse=True)
        print("\n" + "💻 Топ-20 технологий по частоте упоминания:")
        for i, (tech, cnt) in enumerate(sorted_tech[:20], 1):
            print(f"  {i:2}. {tech:20} – {cnt} раз")

        # Построение графика
        try:
            top = sorted_tech[:15]
            names = [t[0] for t in top]
            counts = [t[1] for t in top]
            plt.figure(figsize=(12, 6))
            plt.barh(names, counts, color='skyblue')
            plt.xlabel('Частота упоминаний')
            plt.title('Топ-15 технологий в вакансиях')
            plt.tight_layout()
            plt.savefig('tech_frequency.png')
            print_success("График сохранён как tech_frequency.png")
        except Exception as e:
            print_error(f"Не удалось построить график: {e}")
    else:
        print_warning("Технологии не найдены в тексте.")

# ==================== ЗАПУСК ====================

def main():
    print_header("🚀 ПАРСЕР HH.RU С ПОЛНЫМИ ТРЕБОВАНИЯМИ И АНАЛИЗОМ")

    # Ввод параметров
    query = input("Введите профессию (например, C# разработчик): ").strip()
    if not query:
        query = "C# разработчик"
    region_input = input("Введите код региона (113 – Россия, 1 – Москва, 1206 – Искитим): ").strip()
    area = int(region_input) if region_input.isdigit() else 113
    pages_input = input("Количество страниц (по умолчанию 3, можно ввести 0 для автоматического определения по количеству): ").strip()
    if pages_input == '':
        pages = 3
    else:
        pages = int(pages_input)
    max_vacancies_input = input("Максимальное количество вакансий (по умолчанию 0 – без ограничения): ").strip()
    max_vacancies = int(max_vacancies_input) if max_vacancies_input.isdigit() else None

    print_info(f"Запрос: {query}, регион: {area}, страниц: {pages if pages > 0 else 'авто'}, лимит: {max_vacancies or 'нет'}")

    start_time = time.time()

    # Сбор
    df = parse_hh_vacancies_full(query, num_pages=pages if pages > 0 else 10, area=area, max_vacancies=max_vacancies)

    if df.empty:
        print_error("Вакансии не найдены.")
        return

    # Сохранение
    safe_query = re.sub(r'[^\w\-\.]', '_', query)
    filename = f"vacancies_full_{safe_query}.csv"
    df.to_csv(filename, index=False, encoding='utf-8-sig')
    print_success(f"Сохранено {len(df)} вакансий в {filename}")

    # Анализ
    analyze_vacancies(df)

    elapsed = time.time() - start_time
    print_info(f"Время выполнения: {elapsed:.1f} секунд")

if __name__ == "__main__":
    main()