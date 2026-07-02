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

def get_remote_vacancies(query, pages=3):
    """Поиск только удалённых вакансий через параметр API"""
    all_items = []
    
    for page in range(pages):
        params = {
            "text": query,
            "schedule": "remote",  # Ключевой параметр!
            "per_page": 100,
            "page": page,
            "search_field": "name",
            "order_by": "publication_time"
        }
        
        try:
            resp = requests.get(
                "https://api.hh.ru/vacancies", 
                params=params, 
                headers=HEADERS, 
                timeout=15
            )
            
            if resp.status_code != 200:
                print(f"Ошибка {resp.status_code}: {resp.text[:200]}")
                break
                
            data = resp.json()
            items = data.get("items", [])
            all_items.extend(items)
            print(f"  Страница {page+1}: {len(items)} вакансий")
            
            if not items:
                break
                
            time.sleep(random.uniform(1, 2))
            
        except Exception as e:
            print(f"Ошибка: {e}")
            break
    
    return all_items

# Использование
results = []
for query in QUERIES:
    print(f"\nСобираю: {query}")
    items = get_remote_vacancies(query, pages=3)
    print(f"Всего удалённых: {len(items)}")
    
    for item in items[:15]:
        salary = item.get("salary")
        salary_str = "не указана"
        if salary:
            sal_from = salary.get("from")
            sal_to = salary.get("to")
            sal_cur = salary.get("currency", "RUR")
            if sal_from and sal_to:
                salary_str = f"{sal_from}-{sal_to} {sal_cur}"
            elif sal_from:
                salary_str = f"от {sal_from} {sal_cur}"
            elif sal_to:
                salary_str = f"до {sal_to} {sal_cur}"
        
        results.append({
            "query": query,
            "name": item["name"],
            "employer": item["employer"]["name"],
            "salary": salary_str,
            "url": item["alternate_url"],
            "published": item.get("published_at", "")[:10]
        })
    
    time.sleep(2)

with open("hh_full_analysis.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\nСохранено {len(results)} вакансий")