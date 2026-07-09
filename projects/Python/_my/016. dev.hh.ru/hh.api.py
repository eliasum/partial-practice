import requests
import time
import pandas as pd
import re
import matplotlib.pyplot as plt
import matplotlib
import json
import os

matplotlib.use('Agg')

# ==================== КОНФИГУРАЦИЯ ====================
CLIENT_ID = "QV549CV685OFA0RKD0S83NDR3KS3LJ40G7BGVRQFGKU1E80QNQPBS8JS8NIFS1SV"
CLIENT_SECRET = "RKPBP5L5A5D58TMF0QG0TIEQ5G4MSDMGMG1VA3M8TB1O8U64LVSPUU3HQ6PAVR6C"
BASE_URL = "https://api.hh.ru"
TOKEN_FILE = "token_cache.json"

# ==================== АВТОРИЗАЦИЯ С КЕШИРОВАНИЕМ ====================

def get_oauth_token():
    """Получает access token с кешированием."""
    if os.path.exists(TOKEN_FILE):
        try:
            with open(TOKEN_FILE, "r") as f:
                cache = json.load(f)
                token = cache.get("access_token")
                expires_at = cache.get("expires_at", 0)
                if time.time() < expires_at - 60:
                    return token
        except:
            pass

    auth_url = "https://hh.ru/oauth/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
    resp = requests.post(auth_url, data=data)
    if resp.status_code == 403 and "too early" in resp.text:
        print("⚠️ Слишком частые запросы токена. Ждём 30 секунд...")
        time.sleep(30)
        return get_oauth_token()
    if resp.status_code != 200:
        raise Exception(f"Ошибка получения токена: {resp.text}")

    token_data = resp.json()
    expires_in = token_data.get("expires_in", 1200)
    cache = {
        "access_token": token_data["access_token"],
        "expires_at": time.time() + expires_in
    }
    with open(TOKEN_FILE, "w") as f:
        json.dump(cache, f)

    return token_data["access_token"]

# ==================== API ЗАПРОСЫ ====================

def search_vacancies(token, text, area, page=0, per_page=100):
    url = f"{BASE_URL}/vacancies"
    params = {
        "text": text,
        "area": area,
        "page": page,
        "per_page": per_page,
        "order_by": "publication_time",
    }
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.get(url, params=params, headers=headers)
    if resp.status_code != 200:
        print(f"Ошибка запроса: {resp.status_code}, {resp.text}")
        return None
    return resp.json()

def get_vacancy_details(token, vacancy_id):
    url = f"{BASE_URL}/vacancies/{vacancy_id}"
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.get(url, headers=headers)
    if resp.status_code != 200:
        print(f"Ошибка получения вакансии {vacancy_id}: {resp.status_code}")
        return None
    return resp.json()

# ==================== ИЗВЛЕЧЕНИЕ ЗАРПЛАТЫ ИЗ ТЕКСТА (СТАБИЛЬНАЯ ВЕРСИЯ) ====================

def extract_salary_from_text(text):
    if not text:
        return None, None, None
    text = text.lower().strip()
    # Убираем пробелы между цифрами
    text = re.sub(r'(\d)\s+(\d)', r'\1\2', text)

    # 1. Диапазон: "X – Y руб" или "от X до Y руб"
    match = re.search(r'(\d+)\s*[-–—]\s*(\d+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)', text)
    if match:
        num1 = int(match.group(1))
        num2 = int(match.group(2))
        if 'тыс' in text or 'k' in text:
            num1 *= 1000
            num2 *= 1000
        if 30000 <= num1 <= 2000000 and 30000 <= num2 <= 2000000:
            return num1, num2, (num1 + num2) // 2

    # 2. "от X руб"
    match = re.search(r'от\s*(\d+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)', text)
    if match:
        num = int(match.group(1))
        if 'тыс' in text or 'k' in text:
            num *= 1000
        if 30000 <= num <= 2000000:
            return num, num, num

    # 3. "до X руб"
    match = re.search(r'до\s*(\d+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)', text)
    if match:
        num = int(match.group(1))
        if 'тыс' in text or 'k' in text:
            num *= 1000
        if 30000 <= num <= 2000000:
            return num, num, num

    # 4. Просто "X руб"
    match = re.search(r'(\d+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)', text)
    if match:
        num = int(match.group(1))
        if 'тыс' in text or 'k' in text:
            num *= 1000
        if 30000 <= num <= 2000000:
            return num, num, num

    return None, None, None

# ==================== ОСНОВНАЯ ЛОГИКА ====================

def collect_vacancies(query, area, max_pages):
    token = get_oauth_token()
    print("✅ Токен получен")
    all_vacancies = []
    page = 0
    total_found = None

    while True:
        print(f"📄 Загрузка страницы {page+1}...")
        data = search_vacancies(token, query, area, page, 100)
        if not data or "items" not in data:
            print("❌ Пустой ответ, завершаем.")
            break

        if total_found is None:
            total_found = data.get("found", 0)
            print(f"📊 Всего вакансий: {total_found}")

        items = data["items"]
        if not items:
            break

        for idx, item in enumerate(items, 1):
            print(f"  Обработка {idx}/{len(items)}: {item.get('name', '')[:50]}...")
            vacancy_id = item["id"]
            details = get_vacancy_details(token, vacancy_id)
            if not details:
                continue

            salary_obj = details.get("salary")
            salary_min = salary_max = salary_avg = None
            if salary_obj and salary_obj.get("currency") in ["RUR", "RUB"]:
                from_val = salary_obj.get("from")
                to_val = salary_obj.get("to")
                if from_val and to_val:
                    salary_min, salary_max = from_val, to_val
                    salary_avg = (from_val + to_val) // 2
                elif from_val:
                    salary_min = salary_max = from_val
                    salary_avg = from_val
                elif to_val:
                    salary_min = salary_max = to_val
                    salary_avg = to_val

            description = details.get("description", "")
            if salary_avg is None and description:
                salary_min, salary_max, salary_avg = extract_salary_from_text(description)

            all_vacancies.append({
                "id": vacancy_id,
                "Название": details.get("name", ""),
                "Компания": details.get("employer", {}).get("name", ""),
                "Локация": details.get("area", {}).get("name", ""),
                "Зарплата_текст": salary_obj.get("full") if salary_obj else "",
                "Зарплата_от": salary_min,
                "Зарплата_до": salary_max,
                "Зарплата_средняя": salary_avg,
                "Описание": description,
                "Требования": details.get("requirement", {}).get("content", ""),
                "Обязанности": details.get("responsibility", {}).get("content", ""),
                "Навыки": ", ".join([s["name"] for s in details.get("key_skills", [])]),
                "Ссылка": details.get("alternate_url", ""),
                "Дата_публикации": details.get("published_at", "")[:10],
            })

            time.sleep(0.3)

        page += 1
        if page >= max_pages or page >= (total_found // 100) + 1:
            break

        time.sleep(1)

    return pd.DataFrame(all_vacancies)

# ==================== АНАЛИЗ ====================

def analyze_vacancies(df):
    if df.empty:
        print("❌ Нет данных для анализа.")
        return

    print("\n📊 АНАЛИЗ СОБРАННЫХ ДАННЫХ")
    print(f"✅ Всего вакансий: {len(df)}")
    print(f"ℹ️  Уникальных компаний: {df['Компания'].nunique()}")
    print(f"ℹ️  Уникальных городов: {df['Локация'].nunique()}")

    salaries = df['Зарплата_средняя'].dropna()
    if not salaries.empty:
        print("\n💰 СТАТИСТИКА ПО ЗАРПЛАТАМ (в рублях):")
        print(f"  Минимальная: {int(salaries.min()):,}".replace(',', ' '))
        print(f"  Максимальная: {int(salaries.max()):,}".replace(',', ' '))
        print(f"  Средняя: {int(salaries.mean()):,}".replace(',', ' '))
        print(f"  Медиана: {int(salaries.median()):,}".replace(',', ' '))
        print(f"  Количество вакансий с указанной зарплатой: {len(salaries)} из {len(df)}")
    else:
        print("\n⚠️ Зарплаты не найдены.")

    if not salaries.empty:
        city_salary = df[['Локация', 'Зарплата_средняя']].dropna()
        if not city_salary.empty:
            city_avg = city_salary.groupby('Локация')['Зарплата_средняя'].mean().sort_values(ascending=False).head(10)
            print("\n🏙️ Топ-10 городов по средней зарплате:")
            for i, (city, avg) in enumerate(city_avg.items(), 1):
                print(f"  {i:2}. {city:30} – {int(avg):,} ₽".replace(',', ' '))

    print("\n🏙️ Топ-10 городов по количеству вакансий:")
    city_counts = df['Локация'].value_counts().head(10)
    for i, (city, cnt) in enumerate(city_counts.items(), 1):
        print(f"  {i:2}. {city:30} – {cnt}")

    print("\n🏢 Топ-10 компаний:")
    company_counts = df['Компания'].value_counts().head(10)
    for i, (comp, cnt) in enumerate(company_counts.items(), 1):
        print(f"  {i:2}. {comp:30} – {cnt}")

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
        print("\n💻 Топ-20 технологий по частоте упоминания:")
        for i, (tech, cnt) in enumerate(sorted_tech[:20], 1):
            print(f"  {i:2}. {tech:20} – {cnt} раз")

        try:
            top = sorted_tech[:15]
            names = [t[0] for t in top]
            counts = [t[1] for t in top]
            plt.figure(figsize=(12, 6))
            plt.barh(names, counts, color='skyblue')
            plt.xlabel('Частота упоминаний')
            plt.title('Топ-15 технологий в вакансиях')
            plt.tight_layout()
            plt.savefig('tech_frequency_api.png')
            print("✅ График сохранён как tech_frequency_api.png")
        except Exception as e:
            print(f"❌ Не удалось построить график: {e}")
    else:
        print("⚠️ Технологии не найдены в тексте.")

# ==================== ЗАПУСК ====================

if __name__ == "__main__":
    print("🚀 Парсер hh.ru через официальное API")
    print("=" * 50)

    query = input("Введите профессию (по умолчанию 'C# разработчик'): ").strip()
    if not query:
        query = "C# разработчик"

    area_input = input("Введите код региона (113 – Россия, 1 – Москва, 65 – Новосибирская область, по умолчанию 113): ").strip()
    area = int(area_input) if area_input.isdigit() else 113

    pages_input = input("Количество страниц (максимум 20, по умолчанию 20): ").strip()
    max_pages = int(pages_input) if pages_input.isdigit() and int(pages_input) <= 20 else 20

    print(f"\n🔍 Ищем: {query}")
    print(f"📍 Регион: {area}")
    print(f"📄 Страниц: {max_pages} (до {max_pages * 100} вакансий)")
    print("=" * 50)

    start_time = time.time()
    df = collect_vacancies(query, area, max_pages)

    if not df.empty:
        filename = f"vacancies_api_{query.replace(' ', '_')}.csv"
        df.to_csv(filename, index=False, encoding='utf-8-sig')
        print(f"\n✅ Сохранено {len(df)} вакансий в {filename}")
        analyze_vacancies(df)
    else:
        print("❌ Вакансии не найдены.")

    elapsed = time.time() - start_time
    print(f"\n⏱️ Время выполнения: {elapsed:.1f} сек.")