import requests
import json
import time
import random

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json"
}

QUERIES = [
    "C# developer",  # Простой запрос, фильтруем потом
    "C# разработчик",
    "C# backend",
    ".NET разработчик",
    "Python FastAPI",
    "Python backend",
    "FastAPI developer"
]

def get_all_vacancies(query, area=None, pages=3):
    """Пагинация по страницам"""
    all_items = []
    
    for page in range(pages):
        params = {
            "text": query,
            "area": area,  # None = вся Россия
            "per_page": 100,
            "page": page,
            "search_field": "name",  # Только в названии, не в описании
            "order_by": "publication_time"
        }
        
        try:
            resp = requests.get("https://api.hh.ru/vacancies", 
                              params=params, headers=HEADERS, timeout=10)
            
            if resp.status_code == 403:
                print(f"Блокировка на странице {page}, ждём...")
                time.sleep(10)
                continue
                
            data = resp.json()
            items = data.get("items", [])
            all_items.extend(items)
            
            if not items:
                break
                
            time.sleep(random.uniform(1, 3))  # Случайная задержка
            
        except Exception as e:
            print(f"Ошибка: {e}")
            break
    
    return all_items

def filter_remote(vacancies):
    """Фильтруем удалёнку по всем признакам"""
    remote_keywords = ['удален', 'удалён', 'remote', 'relocation', 'релокация']
    remote_ids = []
    
    for v in vacancies:
        is_remote = False
        
        # Проверяем поле schedule
        schedule = v.get("schedule", {}) or {}
        if schedule.get("id") == "remote" or "удал" in str(schedule.get("name", "")).lower():
            is_remote = True
        
        # Проверяем employment
        employment = v.get("employment", {}) or {}
        emp_name = str(employment.get("name", "")).lower()
        if "удал" in emp_name or "remote" in emp_name:
            is_remote = True
        
        # Проверяем название вакансии
        name = v.get("name", "").lower()
        if any(kw in name for kw in remote_keywords):
            is_remote = True
        
        # Проверяем snippet (краткое описание)
        snippet = v.get("snippet", {}) or {}
        requirement = str(snippet.get("requirement", "")).lower()
        responsibility = str(snippet.get("responsibility", "")).lower()
        if any(kw in requirement or kw in responsibility for kw in remote_keywords):
            is_remote = True
        
        if is_remote:
            remote_ids.append(v)
    
    return remote_ids

# Сбор данных
results = []

for query in QUERIES:
    print(f"Собираю: {query}")
    items = get_all_vacancies(query, area=None, pages=3)  # Вся Россия
    print(f"  Найдено всего: {len(items)}")
    
    remote = filter_remote(items)
    print(f"  Из них удалёнка: {len(remote)}")
    
    for item in remote[:20]:  # Берём топ-20 по каждому запросу
        results.append({
            "query": query,
            "name": item["name"],
            "employer": item["employer"]["name"],
            "salary": item.get("salary"),
            "url": item["alternate_url"],
            "schedule": item.get("schedule", {}).get("name"),
            "snippet": item.get("snippet", {}).get("requirement", "")[:200]
        })
    
    time.sleep(2)

with open("hh_full_analysis.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\nСохранено {len(results)} вакансий")