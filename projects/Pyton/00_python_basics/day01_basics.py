#2025.09.12 16:40 IMM

#Часть 1. Основы синтаксиса Python

print("lets go calculations: ")
result = 2 + 2
print("2 + 2 = ", result)

#1. переменные и типы
quantity = 10
print(quantity)

#2. списки

#создание списка запчастей
parts_list = ["oil filter","fire pens","unspeed stones"]

#добавление элемента
parts_list.append("air filter")

print(parts_list)

#обращение к элементам
first_part = parts_list[0]
print("The first element of list is", first_part)

#перебор списка
print("all elements: ")
for part in parts_list:
    print("-",part)

#проверка наличия элемента
if "oil filter" in parts_list:
    print("filter in the list")

#3. Словари

#создание словаря (ключ: значение)
part = {
    "id": 123,
    "name": "air filter",
    "price": 1500,
    "in_stock": True
}

#обращение по ключу
print(part["name"])

#изменение значения
part["price"] = 400

#добавление новой пары
part["quantity"] = 10

#перебор словаря
for key, value in part.items():
    print(f"{key}: {value}")






