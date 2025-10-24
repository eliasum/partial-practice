# 2025.10.24 16:31 IMM

# ОТПРАВКА ОТВЕТА

# В прошлой теме рассмотривалась обработка запроса функциями, например, простейший код:

# from fastapi import FastAPI

# app = FastAPI()


# @app.get("/")
# def root():
#     return {"message": "Hello METANIT.COM"}


# Здесь функция root обрабатывает запрос по пути "/" (то есть обращение к корню
# веб-приложения) и возвращает некоторый результат в виде словаря (объект dict),
# который содержит один элемент "message". При отправке эти данные автоматически
# сериализуются в формат JSON - популярный формат для взаимодействия между
# клиентом и сервером. А у ответа для заголовка content-type устанавливается
# значение application/json. Вообще функция может возвращать различные данные -
# словари (dict), списки (list), одиночные значения типа строк, чисел и т.д.,
# которые затем сериализуются в json с помощью кодировщика
# fastapi.encoders.jsonable_encoder. А для отправки ответа
# FastAPI по умолчанию использует класс fastapi.responses.JSONResponse.
# То есть предыдущий код в принципе будет эквивалентен следующему:

# from fastapi import FastAPI
# from fastapi.encoders import jsonable_encoder
# from fastapi.responses import JSONResponse

# app = FastAPI()


# @app.get("/")
# def root():
#     data = {"message": "Hello METANIT.COM"}
#     json_data = jsonable_encoder(data)
#     return JSONResponse(content=json_data)


# Параметр content задает отправляемые данные. Либо можно без явной
# сериализации передать данные в JSONResponse:

from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/")
def root():
    return JSONResponse(content={"message": "Hello METANIT.COM"})


# И при необходимости отправить какие-то нестандартные несериализуемые
# данные или, если нас не устраивает сериализация по умолчанию, мы
# можем определить свой сериализатор json.

# Однако функция необязательно должна возвращать именно данные в формает json. В реальности мы можем возвратить объект класса Response или одного из его подклассов (коим также является JSONResponse), которые позволяют отправлять клиенту ответ в различных видах и формах. Рассмотрим некоторые из этих классов.

# RESPONSE

# Класс fastapi.Response является базовым для остальных классов ответа. Его преимуществом является то, что он позволяется также отправить ответ, который не покрывается встроенными классами, например, в каком-то нестандартном формате. Для отпределения ответа конструктор класса принимает следующие параметры:

# content: задает отправляемое содержимое

# status_code: задает статусный код ответа

# media_type: задает MIME-тип ответа

# headers: задает заголовки ответа

# Рассмотрим простейший пример:

# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
# from fastapi import FastAPI, Response

# app = FastAPI()


# @app.get("/")
# def root():
#     data = "Hello METANIT.COM"
#     return Response(content=data, media_type="text/plain")
# В данном случае клиенту отправляет обычная строка "Hello METANIT.COM". А MIME-тип "text/plain" указывает, что тип ответа - простой текст.

# Класс Response и отправка ответа в веб-приложении на FastAPI и Python

# PLAINTEXTRESPONSE

# Для отправки простого текста также можно использовать класс-наследник PlainTextResponse

# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
# from fastapi import FastAPI
# from fastapi.responses import PlainTextResponse

# app = FastAPI()

# @app.get("/")
# def root():
#     data = "Hello METANIT.COM"
#     return PlainTextResponse(content=data)

# HTMLRESPONSE

# Для упрощения отправки кода html предназначен класс HTMLResponse. Он устанавливает для заголовока Content-Type значение text/html:

# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
# from fastapi import FastAPI
# from fastapi.responses import HTMLResponse

# app = FastAPI()

# @app.get("/")
# def root():
#     data = "<h2>Hello METANIT.COM</h2>"
#     return HTMLResponse(content=data)
# Класс HTMLResponse и отправка клиенту кода html в веб-приложении на FastAPI и Python

# УСТАНОВКА ТИПА ОТВЕТА ЧЕРЕЗ МЕТОДЫ FASTAPI

# Методы FastAPI такие как get(), post() и т.д. позволяют задать тип ответа с помощью параметра response_class:

# 1
# 2
# 3
# 4
# 5
# 6
# 7
# 8
# 9
# 10
# 11
# 12
# from fastapi import FastAPI
# from fastapi.responses import PlainTextResponse, JSONResponse, HTMLResponse

# app = FastAPI()

# @app.get("/text", response_class = PlainTextResponse)
# def root_text():
#     return "Hello METANIT.COM"

# @app.get("/html", response_class = HTMLResponse)
# def root_html():
#     return "<h2>Hello METANIT.COM</h2>"
