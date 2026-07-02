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

HH_QUERIES = {
    "C#": [
        "C# developer", "C# разработчик", "C#-разработчик", ".NET developer",
        ".NET разработчик", "C# backend", "C# бэкенд", "ASP.NET Core",
        "C# удаленно", "C# remote", "Senior C#", "Middle C#",
        "Ведущий разработчик C#", "C# программист", "C# инженер",
    ],
    "Python": [
        "Python developer", "Python разработчик", "Python-разработчик",
        "Python backend", "Python бэкенд", "FastAPI", "Django",
        "FastAPI developer", "Python удаленно", "Python remote",
        "Senior Python", "Middle Python", "Python инженер", "Backend Python",
    ]
}

TARGET_EMPLOYERS = {
    "Т-Банк": "41862", "Тензор": "2071925", "Контур": "4181",
    "Яндекс": "1740", "Сбер": "3529", "VK": "15478",
    "Альфа-Банк": "80", "Райффайзен": "686232", "Газпромбанк": "3388",
    "Лаборатория Касперского": "250",
}

HABR_URLS = [
    "https://career.habr.com/vacancies?q=C%23&remote=true",
    "https://career.habr.com/vacancies?q=.NET&remote=true",
    "https://career.habr.com/vacancies?q=Python&remote=true",
    "https://career.habr.com/vacancies?q=FastAPI&remote=true",
    "https://career.habr.com/vacancies?q=backend&remote=true",
]

# ============ ФУНКЦИИ API ============

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

# ============ СБОР ДАННЫХ ============

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

# ============ АНАЛИТИКА И СЖАТЫЙ ОТЧЁТ ============

def analyze_and_save(vacancies, stats):
    print(f"\nВсего собрано: {len(vacancies)}")
    
    # Дедупликация
    seen = set()
    unique = []
    for v in vacancies:
        vid = v.get("id", v.get("url"))
        if vid and vid not in seen:
            seen.add(vid)
            unique.append(v)
    print(f"Уникальных: {len(unique)}")
    
    # === СЖАТЫЙ ОТЧЁТ (ВАРИАНТ 1) ===
    # Фильтруем только C#, Python, target с зарплатой в рублях
    filtered = []
    for v in unique:
        qt = v.get("query_type", "")
        if qt not in ["C#", "Python", "target"]:
            continue
        
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
        
        # Упрощаем структуру для компактности
        filtered.append({
            "name": v["name"][:80],
            "employer": v["employer"][:35],
            "salary_avg": int(avg),
            "salary_from": f,
            "salary_to": t,
            "type": qt,
            "url": v["url"],
            "snippet": (v.get("snippet") or "")[:250],
        })
    
    # Сортируем по зарплате
    filtered.sort(key=lambda x: x["salary_avg"], reverse=True)
    
    # Статистика по типам
    csharp_all = [v for v in unique if v.get("query_type") == "C#"]
    python_all = [v for v in unique if v.get("query_type") == "Python"]
    target_all = [v for v in unique if v.get("query_type") == "target"]
    
    def calc_salary_stats(vac_list):
        salaries = []
        for v in vac_list:
            s = v.get("salary")
            if not s or s.get("currency") not in ["RUR", "RUB"]:
                continue
            f, t = s.get("from"), s.get("to")
            if f and t:
                salaries.append((f + t) / 2)
            elif f:
                salaries.append(f)
            elif t:
                salaries.append(t)
        if not salaries:
            return {"count": 0, "min": 0, "max": 0, "avg": 0, "median": 0}
        salaries.sort()
        n = len(salaries)
        return {
            "count": n,
            "min": int(min(salaries)),
            "max": int(max(salaries)),
            "avg": int(sum(salaries) / n),
            "median": int(salaries[n // 2]) if n % 2 == 1 else int((salaries[n//2-1] + salaries[n//2]) / 2),
        }
    
    # Требования по ключевым словам (из snippet)
    def extract_requirements(vac_list, keywords):
        counts = {kw: 0 for kw in keywords}
        for v in vac_list:
            snippet = (v.get("snippet") or "").lower()
            for kw in keywords:
                if kw.lower() in snippet:
                    counts[kw] += 1
        return {k: v for k, v in sorted(counts.items(), key=lambda x: x[1], reverse=True) if v > 0}
    
    csharp_reqs = ["ASP.NET", ".NET Core", "Entity Framework", "SQL", "PostgreSQL", "Docker", "Kubernetes", "Kafka", "gRPC", "REST API", "Git", "CI/CD", "Microservices", "WPF", "WinForms"]
    python_reqs = ["FastAPI", "Django", "Flask", "SQLAlchemy", "PostgreSQL", "asyncio", "Docker", "Kubernetes", "Kafka", "Redis", "Celery", "REST API", "Git", "CI/CD", "Microservices", "Pydantic", "Alembic"]
    
    # Итоговый сжатый отчёт
    compact = {
        "meta": {
            "collected_at": datetime.now().isoformat(),
            "total_unique": len(unique),
            "with_salary_rub": len(filtered),
        },
        "stats_by_type": {
            "C#": {
                "total_vacancies": len(csharp_all),
                "salary_stats": calc_salary_stats(csharp_all),
                "top_requirements": extract_requirements(csharp_all, csharp_reqs),
            },
            "Python": {
                "total_vacancies": len(python_all),
                "salary_stats": calc_salary_stats(python_all),
                "top_requirements": extract_requirements(python_all, python_reqs),
            },
            "Target_employers": {
                "total_vacancies": len(target_all),
                "companies": list(set(v.get("employer") for v in target_all))[:15],
            },
        },
        "top_100_vacancies": filtered[:100],
        "salary_distribution": {
            "C#": {
                "ranges": {
                    "0-150K": len([v for v in filtered if v["type"] == "C#" and v["salary_avg"] < 150000]),
                    "150-250K": len([v for v in filtered if v["type"] == "C#" and 150000 <= v["salary_avg"] < 250000]),
                    "250-350K": len([v for v in filtered if v["type"] == "C#" and 250000 <= v["salary_avg"] < 350000]),
                    "350-500K": len([v for v in filtered if v["type"] == "C#" and 350000 <= v["salary_avg"] < 500000]),
                    "500K+": len([v for v in filtered if v["type"] == "C#" and v["salary_avg"] >= 500000]),
                }
            },
            "Python": {
                "ranges": {
                    "0-150K": len([v for v in filtered if v["type"] == "Python" and v["salary_avg"] < 150000]),
                    "150-250K": len([v for v in filtered if v["type"] == "Python" and 150000 <= v["salary_avg"] < 250000]),
                    "250-350K": len([v for v in filtered if v["type"] == "Python" and 250000 <= v["salary_avg"] < 350000]),
                    "350-500K": len([v for v in filtered if v["type"] == "Python" and 350000 <= v["salary_avg"] < 500000]),
                    "500K+": len([v for v in filtered if v["type"] == "Python" and v["salary_avg"] >= 500000]),
                }
            },
        },
    }
    
    # Сохраняем сжатый отчёт
    compact_file = f"compact_report_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
    with open(compact_file, "w", encoding="utf-8") as f:
        json.dump(compact, f, ensure_ascii=False, indent=2)
    
    print(f"\nСЖАТЫЙ ОТЧЁТ сохранён: {compact_file}")
    print(f"Размер: ~{len(json.dumps(compact, ensure_ascii=False)) // 1024} Кб")
    
    # Консольная сводка
    print("\n" + "=" * 60)
    print("СВОДКА")
    print("=" * 60)
    print(f"C# вакансий: {len(csharp_all)} (с зарплатой: {compact['stats_by_type']['C#']['salary_stats']['count']})")
    print(f"  Средняя зарплата: {compact['stats_by_type']['C#']['salary_stats']['avg']:,} руб.")
    print(f"  Диапазон: {compact['stats_by_type']['C#']['salary_stats']['min']:,} - {compact['stats_by_type']['C#']['salary_stats']['max']:,}")
    print(f"\nPython вакансий: {len(python_all)} (с зарплатой: {compact['stats_by_type']['Python']['salary_stats']['count']})")
    print(f"  Средняя зарплата: {compact['stats_by_type']['Python']['salary_stats']['avg']:,} руб.")
    print(f"  Диапазон: {compact['stats_by_type']['Python']['salary_stats']['min']:,} - {compact['stats_by_type']['Python']['salary_stats']['max']:,}")
    
    print(f"\nТоп-10 зарплат:")
    for i, v in enumerate(filtered[:10], 1):
        print(f"  {i:2}. {v['employer'][:30]:30} | {v['salary_avg']:>6,} | {v['name'][:40]}")
    
    # Поиск Тензора
    tensor = [v for v in unique if "тензор" in v.get("employer", "").lower()]
    print(f"\nТензор найден: {len(tensor)} вакансий")
    
    # Полный отчёт остаётся для локального использования
    full_file = f"full_report_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
    with open(full_file, "w", encoding="utf-8") as f:
        json.dump({
            "meta": {"collected_at": datetime.now().isoformat(), "total": len(unique)},
            "stats": stats,
            "vacancies": unique,
        }, f, ensure_ascii=False, indent=2)
    print(f"\nПолный отчёт: {full_file} ({len(json.dumps({'vacancies': unique}, ensure_ascii=False)) // (1024*1024)}+ Мб)")
    
    return compact_file

if __name__ == "__main__":
    vacs, stats = collect_all_data()
    compact_file = analyze_and_save(vacs, stats)
    print(f"\nПришлите файл: {compact_file}")