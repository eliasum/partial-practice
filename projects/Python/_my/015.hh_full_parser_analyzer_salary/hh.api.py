import random
import re
import time

import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import requests
from bs4 import BeautifulSoup

matplotlib.use("Agg")

# Для цветного вывода
try:
    from colorama import Back, Fore, Style, init

    init(autoreset=True)
    COLOR_ENABLED = True
except ImportError:
    COLOR_ENABLED = False

    # Заглушки
    class Fore:
        GREEN = ""
        RED = ""
        YELLOW = ""
        CYAN = ""
        WHITE = ""
        LIGHTGREEN_EX = ""
        LIGHTCYAN_EX = ""
        LIGHTWHITE_EX = ""
        BLUE = ""
        MAGENTA = ""
        LIGHTMAGENTA_EX = ""

    class Back:
        BLUE = ""
        GREEN = ""

    class Style:
        BRIGHT = ""
        RESET_ALL = ""


def print_header(text):
    if COLOR_ENABLED:
        print(
            "\n"
            + Back.BLUE
            + Fore.WHITE
            + Style.BRIGHT
            + " "
            + text
            + " "
            + Style.RESET_ALL
        )
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


def print_progress(iteration, total, prefix="", suffix="", length=30):
    percent = 100 * iteration / total
    filled = int(length * iteration // total)
    bar = "█" * filled + "-" * (length - filled)
    if COLOR_ENABLED:
        print(
            f"\r{Fore.YELLOW}{prefix} |{Fore.GREEN}{bar}{Fore.YELLOW}| {Fore.LIGHTCYAN_EX}{percent:.1f}% {suffix}",
            end="",
        )
    else:
        print(f"\r{prefix} |{bar}| {percent:.1f}% {suffix}", end="")
    if iteration == total:
        print()


# ==================== УЛУЧШЕННОЕ ИЗВЛЕЧЕНИЕ ЗАРПЛАТЫ ====================


def extract_salary_from_text(text):
    if not text:
        return None, None, None
    text = text.lower().strip()
    text = re.sub(r"(\d)\s+(\d)", r"\1\2", text)
    patterns = [
        r"(?:от|с)\s*([\d]+)\s*(?:до|–|—|-)\s*([\d]+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)",
        r"([\d]+)\s*(?:–|—|-)\s*([\d]+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)",
        r"(?:от|с)\s*([\d]+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)",
        r"(?:до)\s*([\d]+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)",
        r"([\d]+)\s*(?:руб|₽|р\.|рублей|тыс\.|k)",
    ]
    salary_min = salary_max = None
    found = False
    for pattern in patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        for match in matches:
            if isinstance(match, tuple) and len(match) >= 2:
                try:
                    num1 = int(match[0])
                    num2 = int(match[1])
                    if "тыс" in text or "k" in text:
                        num1 *= 1000
                        num2 *= 1000
                    if 30000 <= num1 <= 2000000 and 30000 <= num2 <= 2000000:
                        salary_min, salary_max = num1, num2
                        found = True
                        break
                except:
                    pass
            elif isinstance(match, str) or (
                isinstance(match, tuple) and len(match) == 1
            ):
                try:
                    num_str = match if isinstance(match, str) else match[0]
                    num = int(num_str)
                    if "тыс" in text or "k" in text:
                        num *= 1000
                    if 30000 <= num <= 2000000:
                        salary_min = salary_max = num
                        found = True
                        break
                except:
                    pass
        if found:
            break
    salary_avg = None
    if salary_min is not None and salary_max is not None:
        salary_avg = (salary_min + salary_max) // 2
    elif salary_min is not None:
        salary_avg = salary_min
    return salary_min, salary_max, salary_avg


# ==================== ПАРСИНГ ДЕТАЛЕЙ ВАКАНСИИ ====================


def parse_vacancy_details(url, salary_text_from_card=None, retries=3):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    }
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=headers, timeout=30)
            if resp.status_code == 403:
                print_warning(f"403 на {url}, пауза {attempt + 1 * 5} сек...")
                time.sleep((attempt + 1) * 5)
                continue
            if resp.status_code != 200:
                return "", "", "", "", None, None, None
            soup = BeautifulSoup(resp.text, "html.parser")
            description = ""
            desc_block = soup.find("div", {"data-qa": "vacancy-description"})
            if desc_block:
                description = desc_block.text.strip()
            requirements = ""
            req_block = soup.find("div", {"data-qa": "vacancy-requirements"})
            if req_block:
                requirements = req_block.text.strip()
            if not requirements and description:
                match = re.search(
                    r"(?:Требования|Необходимые навыки|Мы ждём|Мы ищем)[\s:]+(.+?)(?:\n\n|$)",
                    description,
                    re.IGNORECASE | re.DOTALL,
                )
                if match:
                    requirements = match.group(1).strip()
            responsibilities = ""
            resp_block = soup.find("div", {"data-qa": "vacancy-responsibilities"})
            if resp_block:
                responsibilities = resp_block.text.strip()
            if not responsibilities and description:
                match = re.search(
                    r"(?:Обязанности|Чем предстоит заниматься|Что нужно делать)[\s:]+(.+?)(?:\n\n|$)",
                    description,
                    re.IGNORECASE | re.DOTALL,
                )
                if match:
                    responsibilities = match.group(1).strip()
            skills = ""
            skills_block = soup.find("div", {"data-qa": "skills-section"})
            if skills_block:
                skills = skills_block.text.strip()
            if not description:
                main_content = soup.find("div", {"data-qa": "vacancy-view-content"})
                if main_content:
                    description = main_content.text.strip()
            salary_min = salary_max = salary_avg = None
            if salary_text_from_card and salary_text_from_card != "Не указана":
                salary_min, salary_max, salary_avg = extract_salary_from_text(
                    salary_text_from_card
                )
            if salary_min is None:
                full_text = (
                    description
                    + " "
                    + requirements
                    + " "
                    + responsibilities
                    + " "
                    + skills
                )
                salary_min, salary_max, salary_avg = extract_salary_from_text(full_text)
            return (
                description,
                requirements,
                responsibilities,
                skills,
                salary_min,
                salary_max,
                salary_avg,
            )
        except Exception as e:
            print_warning(f"Ошибка при парсинге {url} (попытка {attempt + 1}): {e}")
            time.sleep((attempt + 1) * 5)
    return "", "", "", "", None, None, None


# ==================== ОСНОВНОЙ ПАРСЕР ====================


def parse_hh_vacancies_full(query, num_pages=3, area=113, max_vacancies=None):
    base_url = "https://hh.ru/search/vacancy"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
    }
    all_vacancies = []
    total_found = 0

    if num_pages == 0 or max_vacancies:
        params_first = {"text": query, "page": 0, "items_on_page": 50, "area": area}
        try:
            resp_first = requests.get(
                base_url, headers=headers, params=params_first, timeout=30
            )
            if resp_first.status_code == 200:
                soup_first = BeautifulSoup(resp_first.text, "html.parser")
                total_text = soup_first.find("h1", {"data-qa": "title"})
                if total_text:
                    match = re.search(r"(\d+)", total_text.text)
                    if match:
                        total_found = int(match.group(1))
        except:
            pass
    if total_found == 0:
        total_found = 1000
    if max_vacancies and max_vacancies > 0:
        pages_needed = min(num_pages if num_pages > 0 else 10, (total_found + 49) // 50)
    else:
        pages_needed = num_pages if num_pages > 0 else 10
    if pages_needed > 7:
        print_warning("Слишком много страниц, ограничим до 7 для избежания блокировки")
        pages_needed = 7
    print_info(
        f"Будет обработано страниц: {pages_needed} (всего найдено ~{total_found} вакансий)"
    )

    for page in range(pages_needed):
        params = {"text": query, "page": page, "items_on_page": 50, "area": area}
        print_info(f"Загрузка страницы {page + 1} из {pages_needed}...")
        response = None
        for attempt in range(3):
            try:
                response = requests.get(
                    base_url, headers=headers, params=params, timeout=30
                )
                break
            except Exception as e:
                print_warning(
                    f"Ошибка при запросе страницы {page + 1} (попытка {attempt + 1}): {e}"
                )
                time.sleep((attempt + 1) * 5)
                if attempt == 2:
                    print_error(
                        f"Не удалось загрузить страницу {page + 1} после 3 попыток, пропускаем."
                    )
        if response is None:
            continue
        if response.status_code == 403:
            print_warning(
                f"403 на странице {page + 1}, пауза 30 сек и переход к следующей..."
            )
            time.sleep(30)
            continue
        if response.status_code != 200:
            print_error(f"Ошибка {response.status_code} на странице {page + 1}")
            continue
        soup = BeautifulSoup(response.text, "html.parser")
        vacancy_items = soup.select("div[data-qa='vacancy-serp__vacancy']")
        if not vacancy_items:
            vacancy_items = soup.select("div.serp-item")
            if not vacancy_items:
                print_error(
                    f"На странице {page + 1} не найдено карточек. Возможно, структура изменилась."
                )
                continue
        print_info(f"Найдено {len(vacancy_items)} карточек на странице {page + 1}")
        for idx, item in enumerate(vacancy_items, 1):
            try:
                title_elem = item.select_one("a[data-qa='serp-item__title']")
                if not title_elem:
                    title_elem = item.select_one("a.bloko-link")
                if not title_elem:
                    continue
                title = title_elem.text.strip()
                link = title_elem.get("href")
                if link and not link.startswith("http"):
                    link = "https://hh.ru" + link
                salary_elem = item.select_one(
                    "span[data-qa='vacancy-serp__vacancy-compensation']"
                )
                if not salary_elem:
                    salary_elem = item.select_one("span.bloko-header-section-3")
                salary_text = salary_elem.text.strip() if salary_elem else "Не указана"
                company_elem = item.select_one(
                    "a[data-qa='vacancy-serp__vacancy-employer']"
                )
                if not company_elem:
                    company_elem = item.select_one(
                        "div.vacancy-serp-item__meta-info-company a"
                    )
                company = company_elem.text.strip() if company_elem else "Не указана"
                location_elem = item.select_one(
                    "span[data-qa='vacancy-serp__vacancy-address']"
                )
                if not location_elem:
                    location_elem = item.select_one(
                        "div.vacancy-serp-item__meta-info-address"
                    )
                location = location_elem.text.strip() if location_elem else "Не указан"
                print_progress(
                    idx,
                    len(vacancy_items),
                    prefix=f"Обработка карточки {idx}/{len(vacancy_items)}",
                )
                (
                    description,
                    requirements,
                    responsibilities,
                    skills,
                    salary_min,
                    salary_max,
                    salary_avg,
                ) = parse_vacancy_details(link, salary_text)
                all_vacancies.append(
                    {
                        "Название": title,
                        "Компания": company,
                        "Локация": location,
                        "Зарплата_текст": salary_text,
                        "Зарплата_от": salary_min,
                        "Зарплата_до": salary_max,
                        "Зарплата_средняя": salary_avg,
                        "Описание": description,
                        "Требования": requirements,
                        "Обязанности": responsibilities,
                        "Навыки": skills,
                        "Ссылка": link,
                    }
                )
                if max_vacancies and len(all_vacancies) >= max_vacancies:
                    print_info(f"Достигнут лимит {max_vacancies} вакансий, остановка.")
                    break
                time.sleep(random.uniform(1.0, 2.0))
            except Exception as e:
                print_error(f"Ошибка при обработке карточки: {e}")
                continue
        if max_vacancies and len(all_vacancies) >= max_vacancies:
            break
        time.sleep(random.uniform(3, 5))
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
    salaries = df["Зарплата_средняя"].dropna()
    if not salaries.empty:
        print("\n" + "💰 СТАТИСТИКА ПО ЗАРПЛАТАМ (в рублях):")
        print(f"  Минимальная: {int(salaries.min()):,}".replace(",", " "))
        print(f"  Максимальная: {int(salaries.max()):,}".replace(",", " "))
        print(f"  Средняя: {int(salaries.mean()):,}".replace(",", " "))
        print(f"  Медиана: {int(salaries.median()):,}".replace(",", " "))
        print(
            f"  Количество вакансий с указанной зарплатой: {len(salaries)} из {len(df)}"
        )
    else:
        print("\n" + "⚠️ Зарплаты не найдены в тексте вакансий.")
    if not salaries.empty:
        city_salary = df[["Локация", "Зарплата_средняя"]].dropna()
        if not city_salary.empty:
            city_avg = (
                city_salary.groupby("Локация")["Зарплата_средняя"]
                .mean()
                .sort_values(ascending=False)
                .head(10)
            )
            print("\n" + "🏙️ Топ-10 городов по средней зарплате:")
            for i, (city, avg) in enumerate(city_avg.items(), 1):
                print(f"  {i:2}. {city:30} – {int(avg):,} ₽".replace(",", " "))
    print("\n" + "🏙️ Топ-10 городов по количеству вакансий:")
    city_counts = df["Локация"].value_counts().head(10)
    for i, (city, cnt) in enumerate(city_counts.items(), 1):
        print(f"  {i:2}. {city:30} – {cnt}")
    print("\n" + "🏢 Топ-10 компаний:")
    company_counts = df["Компания"].value_counts().head(10)
    for i, (comp, cnt) in enumerate(company_counts.items(), 1):
        print(f"  {i:2}. {comp:30} – {cnt}")
    all_text = " ".join(
        df["Описание"].fillna("")
        + " "
        + df["Требования"].fillna("")
        + " "
        + df["Обязанности"].fillna("")
    ).lower()
    tech_keywords = [
        ".net core",
        ".net 8",
        ".net 9",
        "asp.net core",
        "c#",
        "postgresql",
        "docker",
        "kubernetes",
        "k8s",
        "rabbitmq",
        "kafka",
        "redis",
        "mongodb",
        "entity framework",
        "ef core",
        "dapper",
        "rest api",
        "web api",
        "grpc",
        "ci/cd",
        "jenkins",
        "gitlab ci",
        "github actions",
        "gitflow",
        "microservices",
        "микросервисы",
        "async",
        "асинхронный",
        "xunit",
        "nunit",
        "moq",
        "unit-тесты",
        "prometheus",
        "grafana",
        "opensearch",
        "elasticsearch",
        "linux",
        "bash",
        "helm",
        "terraform",
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
        try:
            top = sorted_tech[:15]
            names = [t[0] for t in top]
            counts = [t[1] for t in top]
            plt.figure(figsize=(12, 6))
            plt.barh(names, counts, color="skyblue")
            plt.xlabel("Частота упоминаний")
            plt.title("Топ-15 технологий в вакансиях")
            plt.tight_layout()
            plt.savefig("tech_frequency.png")
            print_success("График сохранён как tech_frequency.png")
        except Exception as e:
            print_error(f"Не удалось построить график: {e}")
    else:
        print_warning("Технологии не найдены в тексте.")


# ==================== ЗАПУСК ====================


def main():
    print_header("🚀 ПАРСЕР HH.RU С ПОЛНЫМИ ТРЕБОВАНИЯМИ И АНАЛИЗОМ (включая зарплаты)")

    query = input("Введите профессию (например, C# разработчик): ").strip()
    if not query:
        query = "C# разработчик"
    region_input = input(
        "Введите код региона (113 – Россия, 1 – Москва, 1206 – Искитим): "
    ).strip()
    area = int(region_input) if region_input.isdigit() else 113
    pages_input = input(
        "Количество страниц (по умолчанию 3, 0 – авто, не более 7): "
    ).strip()
    if pages_input == "":
        pages = 3
    else:
        pages = int(pages_input)
        if pages > 7:
            pages = 7
            print_warning("Установлено максимум 7 страниц для избежания блокировки")
    max_vacancies_input = input(
        "Максимальное количество вакансий (по умолчанию 0 – без ограничения): "
    ).strip()
    max_vacancies = int(max_vacancies_input) if max_vacancies_input.isdigit() else None

    print_info(
        f"Запрос: {query}, регион: {area}, страниц: {pages if pages > 0 else 'авто'}, лимит: {max_vacancies or 'нет'}"
    )

    start_time = time.time()
    df = parse_hh_vacancies_full(
        query,
        num_pages=pages if pages > 0 else 7,
        area=area,
        max_vacancies=max_vacancies,
    )

    if df.empty:
        print_error("Вакансии не найдены.")
        return

    safe_query = re.sub(r"[^\w\-\.]", "_", query)
    filename = f"vacancies_full_{safe_query}.csv"
    df.to_csv(filename, index=False, encoding="utf-8-sig")
    print_success(f"Сохранено {len(df)} вакансий в {filename}")

    analyze_vacancies(df)

    elapsed = time.time() - start_time
    print_info(f"Время выполнения: {elapsed:.1f} секунд")


if __name__ == "__main__":
    main()
