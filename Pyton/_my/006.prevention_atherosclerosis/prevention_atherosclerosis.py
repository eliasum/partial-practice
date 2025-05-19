from fpdf import FPDF
from datetime import date

pdf = FPDF()
pdf.add_page()

# Добавляем обычный и жирный шрифт
pdf.add_font("DejaVu", "", "DejaVuSans.ttf", uni=True)
pdf.add_font("DejaVu", "B", "DejaVuSans-Bold.ttf", uni=True)

pdf.set_font("DejaVu", 'B', 14)  # Используем жирный шрифт
pdf.cell(200, 10, txt="Профилактика атеросклероза — персональный план (38 лет)", ln=True, align='C')

pdf.set_font("DejaVu", '', 12)  # Ставим обычный шрифт для следующего текста
pdf.cell(200, 10, txt=f"Дата: {date.today().strftime('%d.%m.%Y')}", ln=True, align='C')
pdf.ln(10)

pdf.set_font("DejaVu", 'B', 12)
pdf.cell(200, 10, txt="1. Обязательные анализы (1 раз в год):", ln=True)

pdf.set_font("DejaVu", '', 12)
analyses = [
    "• Липидограмма: ЛПНП < 2.5–3.0 ммоль/л, ЛПВП > 1.0, ТГ < 1.7",
    "• Глюкоза натощак: < 5.5 ммоль/л",
    "• HbA1c (гликированный гемоглобин): < 5.6%",
    "• Креатинин + СКФ: СКФ > 90 мл/мин",
    "• АЛТ, АСТ: в пределах нормы",
    "• hs-CRP (высокочувствительный С-реактивный белок): < 1 мг/л"
]
for item in analyses:
    pdf.cell(200, 8, txt=item, ln=True)

pdf.ln(5)
pdf.set_font("DejaVu", 'B', 12)
pdf.cell(200, 10, txt="2. Обследования (1 раз в 2–3 года):", ln=True)
pdf.set_font("DejaVu", '', 12)
exams = [
    "• УЗИ БЦА (сонные артерии)",
    "• ЭКГ",
    "• ЭхоКГ (УЗИ сердца)",
    "• Контроль артериального давления (< 130/80)"
]
for item in exams:
    pdf.cell(200, 8, txt=item, ln=True)

pdf.ln(5)
pdf.set_font("DejaVu", 'B', 12)
pdf.cell(200, 10, txt="3. Рекомендации по питанию:", ln=True)
pdf.set_font("DejaVu", '', 12)
pdf.multi_cell(0, 8, txt=(
    "• Больше: рыба, овощи, бобовые, орехи, оливковое масло, клетчатка.\n"
    "• Меньше: сахар, выпечка, белый хлеб, жареное, колбасы, сливочное масло."
))

pdf.ln(3)
pdf.set_font("DejaVu", 'B', 12)
pdf.cell(200, 10, txt="4. Физическая активность:", ln=True)
pdf.set_font("DejaVu", '', 12)
pdf.multi_cell(0, 8, txt=(
    "• 8000 шагов в день — хорошо. Добавить:\n"
    "  - 3× в неделю по 30–40 минут аэробной нагрузки\n"
    "  - 2× в неделю силовые упражнения (собственный вес)\n"
))

pdf.ln(3)
pdf.set_font("DejaVu", 'B', 12)
pdf.cell(200, 10, txt="5. Образ жизни:", ln=True)
pdf.set_font("DejaVu", '', 12)
pdf.multi_cell(0, 8, txt=(
    "• Сон 7–8 часов\n"
    "• Управление стрессом\n"
    "• Не курить\n"
    "• Алкоголь — умеренно или исключить\n"
    "• Контроль массы тела (ИМТ < 25)"
))

pdf.ln(3)
pdf.set_font("DejaVu", 'B', 12)
pdf.cell(200, 10, txt="6. Контроль:", ln=True)
pdf.set_font("DejaVu", '', 12)
control = [
    "• Анализы — 1 раз в год",
    "• Артериальное давление и вес — 1–2 раза в месяц",
    "• Физнагрузка — 3–5 дней в неделю",
    "• УЗИ, ЭКГ — 1 раз в 2–3 года"
]
for item in control:
    pdf.cell(200, 8, txt=item, ln=True)

pdf.output("Профилактика_атеросклероза_план_38лет.pdf")