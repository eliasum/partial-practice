import requests
import json
import time
import random
from datetime import datetime

# ============ КОНФИГУРАЦИЯ ============

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "application/json"
}

# Расширенные запросы для HH.ru
HH_QUERIES = {
    "C#": [
        "C# developer",
        "C# разработчик",
        "C#-разработчик",
        ".NET developer",
        ".NET разработчик",
        "C# backend",
        "C# бэкенд",
        "ASP.NET Core",
        "C# удаленно",
        "C# remote",
        "Senior C#",
        "Middle C#",
        "Ведущий разработчик C#",
        "C# программист",
        "C# инженер",
    ],
    "Python": [
        "Python developer",
        "Python разработчик",
        "Python-разработчик",
        "Python backend",
        "Python бэкенд",
        "FastAPI",
        "Django",
        "FastAPI developer",
        "Python удаленно",
        "Python remote",
        "Senior Python",
        "Middle Python",
        "Python инженер",
        "Backend Python",
    ]
}

# ID крупных работодателей
TARGET_EMPLOYERS = {
    "Т-Банк": "41862",
    "Тензор": "2071925",
    "Контур": "4181",
    "Яндекс": "1740",
    "Сбер": "3529",
    "VK": "15478",
    "Альфа-Банк": "80",
    "Райффайзен": "686232",
    "Газпромбанк": "3388",
    "Лаборатория Касперского": "250",
}

# Хабр Карьера
HABR_URLS = [
    "https://career.habr.com/vacancies?q=C%23&remote=true",
    "https://career.habr.com/vacancies?q=.NET&remote=true",
    "https://career.habr.com/vacancies?q=Python&remote=true",
    "https://career.habr.com/vacancies?q=FastAPI&remote=true",
    "https://career.habr.com/vacancies?q=backend&remote=true",
]

# ============ HH.ru API ============

def get_hh_vacancies(query, schedule="remote", pages=2):
    all_items = []
    for page in range(pages):
        params = {
            "text": query,
            "schedule": schedule,
            "per_page": 100,
            "page": page,
            "order_by": "publication_time",
        }
        try:
            resp = requests.get("https://api.hh.ru/vacancies", params=params, headers=HEADERS, timeout=15)
            if resp.status_code == 403:
                time.sleep(10)
                continue
            if resp.status_code != 200:
                break
            data = resp.json()
            items = data.get("items", [])
            all_items.extend(items)
            if not items:
                break
            time.sleep(random.uniform(1, 2))
        except Exception as e:
            break
    return all_items

def get_employer_vacancies(employer_id, schedule="remote", pages=2):
    all_items = []
    for page in range(pages):
        params = {
            "employer_id": employer_id,
            "schedule": schedule,
            "per_page": 100,
            "page": page,
        }
        try:
            resp = requests.get("https://api.hh.ru/vacancies", params=params, headers=HEADERS, timeout=15)
            if resp.status_code == 200:
                data = resp.json()
                items = data.get("items", [])
                all_items.extend(items)
                if not items:
                    break
            time.sleep(random.uniform(1, 2))
        except Exception as e:
            break
    return all_items

# ============ Хабр Карьера ============

def get_habr_vacancies(url):
    try:
        from bs4 import BeautifulSoup
        resp = requests.get(url, headers=HEADERS, timeout=15)
        soup = BeautifulSoup(resp.text, 'html.parser')
        vacancies = []
        cards = soup.find_all('div', class_='vacancy-card')
        for card in cards:
            title_elem = card.find('a', class_='vacancy-card__title')
            if not title_elem:
                continue
            title = title_elem.text.strip()
            link = "https://career.habr.com" + title_elem.get('href', '')
            company_elem = card.find('a', class_='vacancy-card__company')
            company = company_elem.text.strip() if company_elem else "Не указана"
            salary_elem = card.find('div', class_='vacancy-card__salary')
            salary = salary_elem.text.strip() if salary_elem else "Не указана"
            vacancies.append({
                "source": "habr",
                "name": title,
                "employer": company,
                "salary_text": salary,
                "url": link,
            })
        return vacancies
    except Exception as e:
        return []

# ============ ОСНОВНОЙ СБОР ============

def collect_all_data():
    all_vacancies = []
    stats = {"hh_queries": {}, "hh_employers": {}, "habr": {}}
    
    print(f"Старт: {datetime.now()}")
    print("=" * 60)
    
    # C# запросы
    print("\n--- C# ---")
    for query in HH_QUERIES["C#"]:
        print(f"Поиск: {query}")
        items = get_hh_vacancies(query, pages=2)
        print(f"  Найдено: {len(items)}")
        stats["hh_queries"][f"C#: {query}"] = len(items)
        for item in items:
            snippet_data = item.get("snippet") or {}
            all_vacancies.append({
                "source": f"hh.ru: {query}",
                "query_type": "C#",
                "id": item["id"],
                "name": item["name"],
                "employer": item["employer"]["name"],
                "salary": item.get("salary"),
                "url": item["alternate_url"],
                "published": item.get("published_at", "")[:10],
                "schedule": item.get("schedule", {}).get("name"),
                "snippet": (snippet_data.get("requirement") or "")[:300],
            })
        time.sleep(random.uniform(2, 4))
    
    # Python запросы
    print("\n--- PYTHON ---")
    for query in HH_QUERIES["Python"]:
        print(f"Поиск: {query}")
        items = get_hh_vacancies(query, pages=2)
        print(f"  Найдено: {len(items)}")
        stats["hh_queries"][f"Python: {query}"] = len(items)
        for item in items:
            snippet_data = item.get("snippet") or {}
            all_vacancies.append({
                "source": f"hh.ru: {query}",
                "query_type": "Python",
                "id": item["id"],
                "name": item["name"],
                "employer": item["employer"]["name"],
                "salary": item.get("salary"),
                "url": item["alternate_url"],
                "published": item.get("published_at", "")[:10],
                "schedule": item.get("schedule", {}).get("name"),
                "snippet": (snippet_data.get("requirement") or "")[:300],
            })
        time.sleep(random.uniform(2, 4))
    
    # Работодатели
    print("\n--- РАБОТОДАТЕЛИ ---")
    for emp_name, emp_id in TARGET_EMPLOYERS.items():
        print(f"Поиск: {emp_name}")
        items = get_employer_vacancies(emp_id, pages=2)
        print(f"  Найдено: {len(items)}")
        stats["hh_employers"][emp_name] = len(items)
        for item in items:
            snippet_data = item.get("snippet") or {}
            all_vacancies.append({
                "source": f"employer: {emp_name}",
                "query_type": "target",
                "id": item["id"],
                "name": item["name"],
                "employer": item["employer"]["name"],
                "salary": item.get("salary"),
                "url": item["alternate_url"],
                "published": item.get("published_at", "")[:10],
                "schedule": item.get("schedule", {}).get("name"),
                "snippet": (snippet_data.get("requirement") or "")[:300],
            })
        time.sleep(random.uniform(2, 4))
    
    # Хабр Карьера
    print("\n--- ХАБР ---")
    for url in HABR_URLS:
        print(f"Парсинг: {url[:50]}...")
        items = get_habr_vacancies(url)
        print(f"  Найдено: {len(items)}")
        stats["habr"][url] = len(items)
        all_vacancies.extend(items)
        time.sleep(random.uniform(3, 5))
    
    return all_vacancies, stats

# ============ АНАЛИТИКА ============

def analyze_and_save(vacancies, stats):
    print(f"\nВсего: {len(vacancies)}")
    
    # Дедупликация
    seen = set()
    unique = []
    for v in vacancies:
        vid = v.get("id", v.get("url"))
        if vid and vid not in seen:
            seen.add(vid)
            unique.append(v)
    print(f"Уникальных: {len(unique)}")
    
    # Зарплаты
    salaries = []
    for v in unique:
        s = v.get("salary")
        if not s or s.get("currency") not in ["RUR", "RUB"]:
            continue
        f, t = s.get("from"), s.get("to")
        if f and t:
            avg = (f + t) / 2
        elif f:
            avg = f * 1.1
        elif t:
            avg = t * 0.9
        else:
            continue
        salaries.append({
            "avg": int(avg),
            "from": f,
            "to": t,
            "name": v["name"][:50],
            "employer": v["employer"][:25],
            "url": v["url"],
            "type": v.get("query_type", "unknown"),
        })
    salaries.sort(key=lambda x: x["avg"], reverse=True)
    
    print("\n--- ТОП-20 ---")
    for i, s in enumerate(salaries[:20], 1):
        print(f"{i:2}. {s['employer']:25} | {s['avg']:>6}K | {s['name']}")
    
    # Тензор
    tensor = [v for v in unique if "тензор" in v.get("employer", "").lower()]
    print(f"\nТензор: {len(tensor)}")
    for t in tensor[:3]:
        print(f"  - {t['name']}")
    
    # Сохранение
    output = {
        "meta": {"collected_at": datetime.now().isoformat(), "total": len(unique)},
        "stats": stats,
        "top_salaries": salaries[:50],
        "vacancies": unique,
    }
    fname = f"report_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
    with open(fname, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\nСохранено: {fname}")

if __name__ == "__main__":
    vacs, stats = collect_all_data()
    analyze_and_save(vacs, stats)