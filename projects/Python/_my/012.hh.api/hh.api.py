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

# Только разработческие запросы
HH_QUERIES = {
    "C#": [
        "C# backend developer удаленно",
        ".NET Core backend удаленно",
        "ASP.NET Core Web API удаленно",
        "C# разработчик backend удаленно",
        "Senior C# developer удаленно",
        "Middle C# developer удаленно",
    ],
    "Python": [
        "Python backend developer удаленно",
        "Python FastAPI backend удаленно",
        "Python Django backend удаленно",
        "Senior Python developer удаленно",
        "Middle Python developer удаленно",
    ]
}

# Ключевые слова для проверки релевантности
DEV_KEYWORDS = [
    "разработчик", "developer", "программист", "programmer",
    "backend", "бэкенд", "fullstack", "фулстак",
    "инженер", "engineer", "software", "architect"
]

# Исключаем однозначно
EXCLUDE_TITLE = [
    "менеджер", "manager", "продаж", "sales", "hr", "рекрутер", "recruiter",
    "аналитик", "analyst", "тестировщик", "qa", "support", "поддержка",
    "devops", "системный администратор", "administrator",
    "lead", "руководитель", "head of", "директор", "director"
]

# Приоритетные навыки для вашего профиля
PRIORITY_SKILLS_CSHARP = [
    ".net core", "asp.net", "entity framework", "ef core", "sql", "postgresql",
    "docker", "kubernetes", "kafka", "rabbitmq", "grpc", "rest api", "git",
    "microservices", "микросервисы", "async", "асинхрон"
]

PRIORITY_SKILLS_PYTHON = [
    "fastapi", "django", "sqlalchemy", "postgresql", "asyncio", "docker",
    "kubernetes", "kafka", "redis", "celery", "rest api", "git",
    "microservices", "микросервисы", "pydantic", "alembic"
]

# ============ API ФУНКЦИИ ============

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
            resp = requests.get(
                "https://api.hh.ru/vacancies", 
                params=params, 
                headers=HEADERS, 
                timeout=15
            )
            if resp.status_code == 403:
                time.sleep(10)
                continue
            if resp.status_code != 200:
                print(f"    Ошибка {resp.status_code}")
                break
            data = resp.json()
            items = data.get("items", [])
            all_items.extend(items)
            if not items:
                break
            time.sleep(random.uniform(0.5, 1.5))
        except Exception as e:
            print(f"    Исключение: {e}")
            break
    return all_items

def is_developer_vacancy(title):
    """Проверяет, что вакансия — разработческая"""
    title_lower = title.lower()
    
    # Должно содержать хоть одно из DEV_KEYWORDS
    has_dev_keyword = any(kw in title_lower for kw in DEV_KEYWORDS)
    if not has_dev_keyword:
        return False
    
    # Не должно содержать исключений
    has_exclude = any(ex in title_lower for ex in EXCLUDE_TITLE)
    if has_exclude:
        return False
    
    return True

def analyze_csharp_relevance(title, snippet):
    """Анализ релевантности для C# с вашим профилем"""
    score = 0
    reasons = []
    text = (title + " " + snippet).lower()
    
    # Базовый C#
    if "c#" in text or ".net" in text:
        score += 20
        reasons.append("C#/.NET")
    
    # Backend-фокус (важно для вас)
    if "backend" in text or "бэкенд" in text or "api" in text:
        score += 15
        reasons.append("backend/API")
    
    # Приоритетные навыки
    for skill in PRIORITY_SKILLS_CSHARP:
        if skill in text:
            score += 5
            if skill not in [r.lower() for r in reasons]:
                reasons.append(skill)
    
    # Industrial/ERP (ваш бэкграунд)
    if any(word in text for word in ["erp", "mes", "scada", "industrial", "enterprise", "финтех", "fintech", "банк", "bank"]):
        score += 10
        reasons.append("industrial/enterprise")
    
    # Опыт (ваш уровень)
    if "senior" in text or "ведущий" in text:
        score += 10
        reasons.append("senior level")
    elif "middle" in text or "мидл" in text:
        score += 15  # Выше для middle — ваш sweet spot
        reasons.append("middle level")
    
    # Исключения
    if any(word in text for word in ["game", "unity", "unreal", "gamedev", "игр"]):
        score -= 50
        reasons.append("ИСКЛЮЧЕНО: геймдев")
    
    if "frontend" in text and "backend" not in text:
        score -= 30
        reasons.append("только frontend")
    
    return score, reasons

def analyze_python_relevance(title, snippet):
    """Анализ релевантности для Python с вашим профилем"""
    score = 0
    reasons = []
    text = (title + " " + snippet).lower()
    
    # Backend-фокус (критично — исключаем ML/Data Science)
    if "backend" in text or "бэкенд" in text or "web" in text or "api" in text:
        score += 25
        reasons.append("backend/web/API")
    else:
        # Если нет backend в названии — проверяем snippet
        if not ("backend" in snippet.lower() or "api" in snippet.lower()):
            score -= 20  # Штраф за отсутствие backend-контекста
    
    # FastAPI/Django (ваш стек vs рынок)
    if "fastapi" in text:
        score += 15
        reasons.append("FastAPI")
    if "django" in text:
        score += 10
        reasons.append("Django")
    
    # Приоритетные навыки
    for skill in PRIORITY_SKILLS_PYTHON:
        if skill in text:
            score += 5
            if skill not in [r.lower() for r in reasons]:
                reasons.append(skill)
    
    # Исключаем ML/Data Science однозначно
    ml_keywords = ["ml", "machine learning", "data scientist", "data science", 
                   "аналитик данных", "computer vision", "nlp", "deep learning",
                   "нейросети", "tensorflow", "pytorch", "pandas", "numpy"]
    if any(kw in text for kw in ml_keywords):
        score -= 100  # Полный отсев
        reasons.append("ИСКЛЮЧЕНО: ML/Data Science")
    
    # Исключения
    if any(word in text for word in ["game", "unity", "unreal", "gamedev", "игр"]):
        score -= 50
        reasons.append("ИСКЛЮЧЕНО: геймдев")
    
    # Опыт
    if "senior" in text:
        score += 5  # Для Python senior требует опыта, который у вас нет
    elif "middle" in text or "мидл" in text:
        score += 10
        reasons.append("middle level")
    elif "junior" in text or "джун" in text:
        score += 15  # Можно пробовать как "junior с бэкграундом"
        reasons.append("junior — возможен вход")
    
    return score, reasons

# ============ СБОР ДАННЫХ ============

def collect_all_data():
    all_vacancies = []
    stats = {"C#": {"total": 0, "dev": 0, "relevant": 0}, 
             "Python": {"total": 0, "dev": 0, "relevant": 0}}
    
    print(f"Старт: {datetime.now()}")
    print("=" * 70)
    
    # C# запросы
    print("\n--- C# BACKEND ---")
    for query in HH_QUERIES["C#"]:
        print(f"Поиск: {query}")
        items = get_hh_vacancies(query, pages=2)
        print(f"  Найдено API: {len(items)}")
        stats["C#"]["total"] += len(items)
        
        for item in items:
            title = item.get("name", "")
            
            # Фильтр 1: только разработка
            if not is_developer_vacancy(title):
                continue
            stats["C#"]["dev"] += 1
            
            # Фильтр 2: релевантность для вас
            snippet_data = item.get("snippet") or {}
            snippet = snippet_data.get("requirement", "") or ""
            score, reasons = analyze_csharp_relevance(title, snippet)
            
            if score < 30:  # Порог релевантности
                continue
            stats["C#"]["relevant"] += 1
            
            # Сохраняем
            salary = item.get("salary")
            all_vacancies.append({
                "query_type": "C#",
                "id": item["id"],
                "name": title[:100],
                "employer": item["employer"]["name"][:50],
                "salary": salary,
                "salary_calc": calculate_salary(salary),
                "url": item["alternate_url"],
                "published": item.get("published_at", "")[:10],
                "relevance_score": score,
                "relevance_reasons": reasons[:5],
                "snippet": snippet[:200],
            })
        
        time.sleep(random.uniform(1, 2))
    
    # Python запросы
    print("\n--- PYTHON BACKEND ---")
    for query in HH_QUERIES["Python"]:
        print(f"Поиск: {query}")
        items = get_hh_vacancies(query, pages=2)
        print(f"  Найдено API: {len(items)}")
        stats["Python"]["total"] += len(items)
        
        for item in items:
            title = item.get("name", "")
            
            # Фильтр 1: только разработка
            if not is_developer_vacancy(title):
                continue
            stats["Python"]["dev"] += 1
            
            # Фильтр 2: релевантность (строже для Python)
            snippet_data = item.get("snippet") or {}
            snippet = snippet_data.get("requirement", "") or ""
            score, reasons = analyze_python_relevance(title, snippet)
            
            if score < 35:  # Порог выше — меньше вакансий, но чище
                continue
            stats["Python"]["relevant"] += 1
            
            salary = item.get("salary")
            all_vacancies.append({
                "query_type": "Python",
                "id": item["id"],
                "name": title[:100],
                "employer": item["employer"]["name"][:50],
                "salary": salary,
                "salary_calc": calculate_salary(salary),
                "url": item["alternate_url"],
                "published": item.get("published_at", "")[:10],
                "relevance_score": score,
                "relevance_reasons": reasons[:5],
                "snippet": snippet[:200],
            })
        
        time.sleep(random.uniform(1, 2))
    
    return all_vacancies, stats

def calculate_salary(salary_obj):
    """Вычисляет среднюю зарплату для сортировки"""
    if not salary_obj:
        return 0
    if salary_obj.get("currency") not in ["RUR", "RUB"]:
        return 0
    
    f, t = salary_obj.get("from"), salary_obj.get("to")
    if f and t:
        return int((f + t) / 2)
    elif f:
        return int(f * 1.1)
    elif t:
        return int(t * 0.9)
    return 0

# ============ АНАЛИТИКА И СОХРАНЕНИЕ ============

def analyze_and_save(vacancies, stats):
    print(f"\n{'='*70}")
    print("ИТОГИ СБОРА")
    print(f"{'='*70}")
    
    print(f"\nC#:")
    print(f"  Всего от API: {stats['C#']['total']}")
    print(f"  После фильтра 'разработка': {stats['C#']['dev']}")
    print(f"  Релевантные (score ≥30): {stats['C#']['relevant']}")
    
    print(f"\nPython:")
    print(f"  Всего от API: {stats['Python']['total']}")
    print(f"  После фильтра 'разработка': {stats['Python']['dev']}")
    print(f"  Релевантные (score ≥35): {stats['Python']['relevant']}")
    
    # Дедупликация
    seen = set()
    unique = []
    for v in vacancies:
        vid = v.get("id")
        if vid and vid not in seen:
            seen.add(vid)
            unique.append(v)
    
    print(f"\nУникальных релевантных: {len(unique)}")
    
    # Сортировка: сначала по зарплате, потом по релевантности
    unique.sort(key=lambda x: (x.get("salary_calc", 0), x.get("relevance_score", 0)), reverse=True)
    
    # Статистика по зарплатам
    csharp_vacs = [v for v in unique if v["query_type"] == "C#"]
    python_vacs = [v for v in unique if v["query_type"] == "Python"]
    
    def salary_stats(vac_list):
        salaries = [v["salary_calc"] for v in vac_list if v["salary_calc"] > 0]
        if not salaries:
            return {"count": 0, "min": 0, "max": 0, "avg": 0, "median": 0}
        salaries.sort()
        n = len(salaries)
        return {
            "count": n,
            "min": salaries[0],
            "max": salaries[-1],
            "avg": sum(salaries) // n,
            "median": salaries[n//2] if n % 2 else (salaries[n//2-1] + salaries[n//2]) // 2
        }
    
    cs_stats = salary_stats(csharp_vacs)
    py_stats = salary_stats(python_vacs)
    
    # Формируем отчёт
    report = {
        "meta": {
            "collected_at": datetime.now().isoformat(),
            "total_relevant": len(unique),
            "with_salary": len([v for v in unique if v["salary_calc"] > 0]),
        },
        "stats": {
            "C#": {
                "count": len(csharp_vacs),
                "salary": cs_stats,
            },
            "Python": {
                "count": len(python_vacs),
                "salary": py_stats,
            },
        },
        "top_vacancies": [
            {
                "type": v["query_type"],
                "name": v["name"],
                "employer": v["employer"],
                "salary": v["salary_calc"],
                "score": v["relevance_score"],
                "reasons": v["relevance_reasons"],
                "url": v["url"],
            }
            for v in unique[:30]
        ],
        "salary_ranges": {
            "C#": {
                "0-150K": len([v for v in csharp_vacs if v["salary_calc"] < 150000]),
                "150-250K": len([v for v in csharp_vacs if 150000 <= v["salary_calc"] < 250000]),
                "250-350K": len([v for v in csharp_vacs if 250000 <= v["salary_calc"] < 350000]),
                "350K+": len([v for v in csharp_vacs if v["salary_calc"] >= 350000]),
            },
            "Python": {
                "0-150K": len([v for v in python_vacs if v["salary_calc"] < 150000]),
                "150-250K": len([v for v in python_vacs if 150000 <= v["salary_calc"] < 250000]),
                "250-350K": len([v for v in python_vacs if 250000 <= v["salary_calc"] < 350000]),
                "350K+": len([v for v in python_vacs if v["salary_calc"] >= 350000]),
            },
        },
    }
    
    # Сохраняем
    fname = f"clean_report_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
    with open(fname, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    
    # Консольный вывод
    print(f"\n{'='*70}")
    print("ЧИСТАЯ СТАТИСТИКА")
    print(f"{'='*70}")
    print(f"\nC# Backend:")
    print(f"  Вакансий: {len(csharp_vacs)} | С зарплатой: {cs_stats['count']}")
    if cs_stats['count'] > 0:
        print(f"  Зарплата: {cs_stats['min']:,} - {cs_stats['max']:,} (средняя {cs_stats['avg']:,}, медиана {cs_stats['median']:,})")
    
    print(f"\nPython Backend:")
    print(f"  Вакансий: {len(python_vacs)} | С зарплатой: {py_stats['count']}")
    if py_stats['count'] > 0:
        print(f"  Зарплата: {py_stats['min']:,} - {py_stats['max']:,} (средняя {py_stats['avg']:,}, медиана {py_stats['median']:,})")
    
    print(f"\n{'='*70}")
    print("ТОП-10 ВАКАНСИЙ:")
    for i, v in enumerate(unique[:10], 1):
        salary_str = f"{v['salary_calc']:,}" if v['salary_calc'] > 0 else "не указана"
        print(f"{i:2}. [{v['query_type']}] {v['employer'][:25]:25} | {salary_str:>10} | {v['name'][:40]}")
        print(f"    Score: {v['relevance_score']}, Причины: {', '.join(v['relevance_reasons'][:3])}")
    
    print(f"\nСохранено: {fname}")
    print(f"Размер: ~{len(json.dumps(report, ensure_ascii=False)) // 1024} Кб")
    
    return fname

if __name__ == "__main__":
    vacs, stats = collect_all_data()
    fname = analyze_and_save(vacs, stats)
    print(f"\nГотово: {fname}")