import requests
import json
import time
import random
import re
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

# Сферы, которые НЕ подходят (регистронезависимый поиск)
EXCLUDED_DOMAINS = [
    "game", "games", "gaming", "игр", "гейм", "unity", "unreal", "blizzard", "valve",
    "blockchain", "блокчейн", "crypto", "крипто", "web3", "nft", "defi",
    "gambling", "betting", "казино", "букмекер", "ставки", "лотерея",
    "adult", "порно", "эротика", "dating",
    "mlm", "пирамида", "инвестиции", "трейдинг", "форекс", "forex",
]

# Приоритетные сферы (плюс в рейтинге)
PRIORITY_DOMAINS = [
    "fintech", "финтех", "bank", "банк", "enterprise", "энтерпрайз",
    "industrial", "industry", "промышлен", "manufacturing", "автоматизация",
    "erp", "mes", "scada", "crm", "e-commerce", "маркетплейс",
    "healthcare", "медицин", "health", "telecom", "телеком",
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

def get_vacancy_details(vacancy_id):
    """Загружает полное описание вакансии"""
    try:
        resp = requests.get(f"https://api.hh.ru/vacancies/{vacancy_id}", headers=HEADERS, timeout=10)
        if resp.status_code == 200:
            data = resp.json()
            desc = data.get("description", "").lower()
            return {
                "full_description": data.get("description", ""),
                "key_skills": [s["name"] for s in data.get("key_skills", [])],
                "experience": data.get("experience", {}).get("name", ""),
                "employment": data.get("employment", {}).get("name", ""),
                "schedule": data.get("schedule", {}).get("name", ""),
                "professional_roles": [r["name"] for r in data.get("professional_roles", [])],
                "specializations": [s["name"] for s in data.get("specializations", [])],
                "excluded": any(word in desc for word in EXCLUDED_DOMAINS),
                "priority": any(word in desc for word in PRIORITY_DOMAINS),
                "excluded_reason": [word for word in EXCLUDED_DOMAINS if word in desc][:3],
                "priority_reason": [word for word in PRIORITY_DOMAINS if word in desc][:3],
            }
    except Exception as e:
        pass
    return None

# ============ АНАЛИЗ И ФИЛЬТРАЦИЯ ============

def analyze_vacancy_relevance(vacancy, details=None):
    """Оценивает релевантность вакансии для шарписта с industrial-опытом"""
    score = 0
    reasons = []
    red_flags = []
    
    name = vacancy.get("name", "").lower()
    employer = vacancy.get("employer", {}).get("name", "").lower()
    
    # Безопасное получение snippet с защитой от None
    snippet_data = vacancy.get("snippet") or {}
    snippet = (snippet_data.get("requirement") or "").lower()
    
    # Если есть детали — глубокий анализ
    if details:
        if details.get("excluded"):
            return {"score": -100, "relevant": False, "reason": f"Исключённая сфера: {details.get('excluded_reason', [])}"}
        
        # Приоритетные сферы
        if details.get("priority"):
            score += 30
            reasons.append(f"Приоритетная сфера: {details.get('priority_reason', [])}")
        
        # Опыт
        exp = details.get("experience", "")
        if "не требуется" in exp or "1 год" in exp:
            score += 10  # Можно пробовать
            reasons.append("Низкий порог входа")
        elif "3 года" in exp or "3 years" in exp:
            score += 20  # Идеально
            reasons.append("3 года — ваш уровень")
        elif "6 лет" in exp or "5 лет" in exp or "senior" in name:
            score += 15  # Можно с натяжкой
            reasons.append("Senior — можно пробовать")
        
        # Навыки
        skills = [s.lower() for s in details.get("key_skills", [])]
        relevant_skills = ["c#", ".net", "asp.net", "sql", "postgresql", "git", "rest api", "entity framework"]
        for skill in relevant_skills:
            if skill in skills:
                score += 5
        
        # Тип занятости
        if details.get("schedule") == "Удаленная работа":
            score += 10
            reasons.append("Удалёнка")
    
    # Анализ по snippet (если нет деталей)
    else:
        if any(word in snippet for word in ["industrial", "automation", "erp", "mes", "enterprise"]):
            score += 25
            reasons.append("Industrial/ERP в описании")
        if "3" in snippet and ("лет" in snippet or "years" in snippet):
            score += 15
            reasons.append("3 года опыта")
    
    # Рейтинг по score
    relevant = score >= 20
    return {
        "score": score,
        "relevant": relevant,
        "reasons": reasons,
        "red_flags": red_flags,
    }

# ============ СБОР ДАННЫХ ============

def collect_all_data():
    all_vacancies = []
    stats = {"hh_queries": {}, "hh_employers": {}, "filtered": {"relevant": 0, "excluded": 0}}
    
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
            # Быстрая проверка по названию
            name_lower = item["name"].lower()
            if any(word in name_lower for word in ["game", "games", "unity", "unreal", "blizzard"]):
                stats["filtered"]["excluded"] += 1
                continue
            
            # Загружаем детали для релевантных
            details = get_vacancy_details(item["id"])
            relevance = analyze_vacancy_relevance(item, details)
            
            if not relevance["relevant"]:
                stats["filtered"]["excluded"] += 1
                continue
            
            stats["filtered"]["relevant"] += 1
            
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
                "relevance_score": relevance["score"],
                "relevance_reasons": relevance["reasons"],
                "experience_required": details.get("experience") if details else None,
                "key_skills": details.get("key_skills", [])[:10] if details else [],
                "full_description": details.get("full_description", "")[:500] if details else "",
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
            name_lower = item["name"].lower()
            if any(word in name_lower for word in ["game", "games", "unity", "unreal", "ml engineer", "data scientist", "ai engineer"]):
                stats["filtered"]["excluded"] += 1
                continue
            
            details = get_vacancy_details(item["id"])
            relevance = analyze_vacancy_relevance(item, details)
            
            # Для Python порог ниже — меньше вакансий без ML
            if relevance["score"] < 10:
                stats["filtered"]["excluded"] += 1
                continue
            
            stats["filtered"]["relevant"] += 1
            
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
                "relevance_score": relevance["score"],
                "relevance_reasons": relevance["reasons"],
                "experience_required": details.get("experience") if details else None,
                "key_skills": details.get("key_skills", [])[:10] if details else [],
                "full_description": details.get("full_description", "")[:500] if details else "",
            })
        
        time.sleep(random.uniform(2, 4))
    
    # Работодатели (все загружаем с деталями)
    print("\n--- РАБОТОДАТЕЛИ ---")
    for emp_name, emp_id in TARGET_EMPLOYERS.items():
        print(f"Поиск: {emp_name}")
        items = get_employer_vacancies(emp_id, pages=2)
        print(f"  Найдено: {len(items)}")
        stats["hh_employers"][emp_name] = len(items)
        
        for item in items:
            details = get_vacancy_details(item["id"])
            
            # Для целевых работодателей — более мягкий фильтр
            if details and details.get("excluded"):
                stats["filtered"]["excluded"] += 1
                continue
            
            stats["filtered"]["relevant"] += 1
            
            all_vacancies.append({
                "source": f"employer: {emp_name}",
                "query_type": "target",
                "id": item["id"],
                "name": item["name"],
                "employer": item["employer"]["name"],
                "salary": item.get("salary"),
                "url": item["alternate_url"],
                "published": item.get("published_at", "")[:10],
                "relevance_score": 50 if not (details and details.get("excluded")) else 0,  # Целевые — высокий приоритет
                "relevance_reasons": [f"Целевой работодатель: {emp_name}"],
                "experience_required": details.get("experience") if details else None,
                "key_skills": details.get("key_skills", [])[:10] if details else [],
                "full_description": details.get("full_description", "")[:500] if details else "",
            })
        
        time.sleep(random.uniform(2, 4))
    
    return all_vacancies, stats

# ============ АНАЛИТИКА И СОХРАНЕНИЕ ============

def analyze_and_save(vacancies, stats):
    print(f"\nВсего собрано: {len(vacancies)}")
    print(f"Отфильтровано (нерелевантно): {stats['filtered']['excluded']}")
    print(f"Релевантных: {stats['filtered']['relevant']}")
    
    # Дедупликация
    seen = set()
    unique = []
    for v in vacancies:
        vid = v.get("id")
        if vid and vid not in seen:
            seen.add(vid)
            unique.append(v)
    
    print(f"Уникальных релевантных: {len(unique)}")
    
    # Сортировка по релевантности и зарплате
    def sort_key(v):
        s = v.get("salary") or {}
        f, t = s.get("from"), s.get("to")
        avg = (f + t) / 2 if f and t else (f or t or 0)
        return (v.get("relevance_score", 0), avg)
    
    unique.sort(key=sort_key, reverse=True)
    
    # Фильтруем с зарплатой в рублях для итогового отчёта
    filtered_report = []
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
        
        filtered_report.append({
            "name": v["name"][:80],
            "employer": v["employer"][:35],
            "salary_avg": int(avg),
            "salary_from": f,
            "salary_to": t,
            "type": v.get("query_type"),
            "relevance_score": v.get("relevance_score", 0),
            "relevance_reasons": v.get("relevance_reasons", []),
            "experience": v.get("experience_required"),
            "key_skills": v.get("key_skills", [])[:5],
            "url": v["url"],
            "description_preview": v.get("full_description", "")[:300],
        })
    
    # Статистика по типам
    csharp = [v for v in unique if v.get("query_type") == "C#"]
    python = [v for v in unique if v.get("query_type") == "Python"]
    target = [v for v in unique if v.get("query_type") == "target"]
    
    def calc_stats(vac_list):
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
            return {"count": 0, "avg": 0, "median": 0}
        salaries.sort()
        n = len(salaries)
        return {
            "count": n,
            "avg": int(sum(salaries) / n),
            "median": int(salaries[n // 2]) if n % 2 else int((salaries[n//2-1] + salaries[n//2]) / 2),
        }
    
    # Итоговый отчёт
    compact = {
        "meta": {
            "collected_at": datetime.now().isoformat(),
            "total_relevant": len(unique),
            "with_salary_rub": len(filtered_report),
            "excluded_total": stats["filtered"]["excluded"],
        },
        "stats_by_type": {
            "C#": {
                "total": len(csharp),
                "salary": calc_stats(csharp),
            },
            "Python": {
                "total": len(python),
                "salary": calc_stats(python),
            },
            "Target_employers": {
                "total": len(target),
                "companies": list(set(v.get("employer") for v in target))[:10],
            },
        },
        "top_50_relevant_vacancies": filtered_report[:50],
        "salary_distribution": {
            "C#": {
                "0-150K": len([v for v in filtered_report if v["type"] == "C#" and v["salary_avg"] < 150000]),
                "150-250K": len([v for v in filtered_report if v["type"] == "C#" and 150000 <= v["salary_avg"] < 250000]),
                "250-350K": len([v for v in filtered_report if v["type"] == "C#" and 250000 <= v["salary_avg"] < 350000]),
                "350K+": len([v for v in filtered_report if v["type"] == "C#" and v["salary_avg"] >= 350000]),
            },
            "Python": {
                "0-150K": len([v for v in filtered_report if v["type"] == "Python" and v["salary_avg"] < 150000]),
                "150-250K": len([v for v in filtered_report if v["type"] == "Python" and 150000 <= v["salary_avg"] < 250000]),
                "250-350K": len([v for v in filtered_report if v["type"] == "Python" and 250000 <= v["salary_avg"] < 350000]),
                "350K+": len([v for v in filtered_report if v["type"] == "Python" and v["salary_avg"] >= 350000]),
            },
        },
    }
    
    # Сохранение
    fname = f"relevant_report_{datetime.now().strftime('%Y%m%d_%H%M')}.json"
    with open(fname, "w", encoding="utf-8") as f:
        json.dump(compact, f, ensure_ascii=False, indent=2)
    
    print(f"\nСохранено: {fname}")
    print(f"Размер: ~{len(json.dumps(compact, ensure_ascii=False)) // 1024} Кб")
    
    # Консольная сводка
    print("\n" + "=" * 60)
    print("РЕЛЕВАНТНЫЕ ВАКАНСИИ")
    print("=" * 60)
    print(f"C#: {len(csharp)} (с зарплатой: {compact['stats_by_type']['C#']['salary']['count']})")
    if compact['stats_by_type']['C#']['salary']['count'] > 0:
        print(f"  Средняя: {compact['stats_by_type']['C#']['salary']['avg']:,} руб.")
    print(f"\nPython: {len(python)} (с зарплатой: {compact['stats_by_type']['Python']['salary']['count']})")
    if compact['stats_by_type']['Python']['salary']['count'] > 0:
        print(f"  Средняя: {compact['stats_by_type']['Python']['salary']['avg']:,} руб.")
    
    print(f"\nТоп-10 по релевантности и зарплате:")
    for i, v in enumerate(filtered_report[:10], 1):
        print(f"{i:2}. [{v['relevance_score']:2}] {v['employer'][:30]:30} | {v['salary_avg']:>6,} | {v['name'][:40]}")
        if v['relevance_reasons']:
            print(f"    Причины: {', '.join(v['relevance_reasons'][:2])}")
    
    return fname

if __name__ == "__main__":
    vacs, stats = collect_all_data()
    fname = analyze_and_save(vacs, stats)
    print(f"\nГотово: {fname}")