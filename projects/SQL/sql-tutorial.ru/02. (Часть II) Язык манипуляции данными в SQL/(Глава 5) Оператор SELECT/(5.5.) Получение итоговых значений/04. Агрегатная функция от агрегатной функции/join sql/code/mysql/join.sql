/*2021.03.31 22:20 IMM*/

CREATE TABLE `SQL_join`.`Persons` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `name` VARCHAR(15) NOT NULL , `post_id` INT(15) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `SQL_join`.`Positions` ( `id` INT(11) NOT NULL AUTO_INCREMENT, `name` VARCHAR(15) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO Persons (name, post_id) VALUE ('Владимир', '1');
INSERT INTO Persons (name, post_id) VALUE ('Татьяна', '2');
INSERT INTO Persons (name, post_id) VALUE ('Александр', '6');
INSERT INTO Persons (name, post_id) VALUE ('Борис', '2');
/*
Таблица специалистов (Persons as p) - left

 id  |	name 		|	post_id
 --------------------------
 1   |	Владимир 	|	1
 2   |	Татьяна 	|	2
 3   |	Александр 	|	6
 4 	 |	Борис 		|	2
*/

INSERT INTO Positions (name) VALUE ('Дизайнер');
INSERT INTO Positions (name) VALUE ('Редактор');
INSERT INTO Positions (name) VALUE ('Программист');
/*
Таблица должностей (Positions as ps) - right

 id  |	name
 -------------------
 1 	 |	Дизайнер
 2 	 |	Редактор
 3 	 |	Программист
*/

/* 
INNER JOIN

 Внутреннее присоединение. Равносильно просто JOIN или CROSS JOIN (Если в предложении
 WHERE добавить условие соединения (предикат p), то есть ограничения на сочетания кортежей, то 
 результат эквивалентен операции INNER JOIN с таким же условием - ru.wikipedia.org/wiki/Join_(SQL)).
*/
SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность` 
FROM `persons` as p INNER JOIN `positions` as ps ON ps.id = p.post_id;
/* Такой запрос вернет объединенные данные из таблиц только если условие связывания,
указанное в INNER JOIN ON <..>, соблюдается. В нашем случае условие <таблица_должностей>.
<идентификатор> должен совпадать с <таблица_специалистов>.<идентификатор_должности> —
т.е. для сотрудника указан существующий в словаре идентификатор должности.

id 	Имя сотрудника 	pos.id 	Должность 	
1 	Владимир 		1 		Дизайнер
2 	Татьяна 		2 		Редактор
4 	Борис 			2		Редактор

Далее проследим как получить разные части (подмножества) данного множества.

OUTER JOIN

Внешнее присоединение. Различают LEFT OUTER JOIN и RIGHT OUTER JOIN, и обычно опускают слово «OUTER».

Внешнее присоединение включает в себя результаты запроса INNER и добавляются «неиспользованные» строки
 из одной из таблиц. Какую таблицу использовать в качестве «добавки» — указывает токен LEFT или RIGHT.

LEFT JOIN 

Внешнее присоединение «слева».
 */
SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p LEFT OUTER JOIN `positions` as ps ON ps.id = p.post_id;
/*
«Левая» таблица persons, содержит строку id#3 — «Александр», где указан идентификатор должности, 
отсутствующей в словаре.

id 	Имя сотрудника 	pos.id 	Должность 	
1 	Владимир 		1 		Дизайнер
2 	Татьяна 		2 		Редактор
3 	Александр 		NULL	NULL
4 	Борис 			2 		Редактор

RIGHT JOIN 

Присоединение «справа».
*/
SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p RIGHT OUTER JOIN `positions` as ps ON ps.id = p.post_id
/*
Словарь должностей (правая таблица) содержит неиспользуемую запись с id#3 — «программист».
Теперь она попала в результат запроса.

id 		Имя сотрудника 	pos.id 	Должность 	
1 		Владимир 		1 		Дизайнер
2 		Татьяна 		2 		Редактор
4 		Борис 			2 		Редактор
NULL	NULL			3 		Программист

Полное множество

MySQL не знает соединения FULL OUTER JOIN. Что если нужно получить полное множество?

Первый способ — объединение запросов LEFT и RIGHT.
*/
(SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
LEFT OUTER JOIN `positions` as ps ON ps.id = p.post_id)
UNION
(SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
RIGHT OUTER JOIN `positions` as ps ON ps.id = p.post_id)
/*
id 		Имя сотрудника 	pos.id 	Должность 	
1 		Владимир 		1 		Дизайнер
2 		Татьяна 		2 		Редактор
3 		Александр 		NULL	NULL
4 		Борис 			2 		Редактор
NULL	NULL			3 		Программист

При таком вызове UNION, после слияния результатов, SQL отсечет дубли (как DISTINCT). Для отсечения дублей SQL прибегает к сортировке. Это может сказываться на быстродействии.

Второй способ — объединение LEFT и RIGHT, но в одном из запросов мы исключаем часть, соответствующую INNER. А объединение задаём как UNION ALL, что позволяет движку SQL обойтись без сортировки.
*/
(SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
LEFT OUTER JOIN `positions` as ps ON ps.id = p.post_id)
UNION ALL
(SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
RIGHT OUTER JOIN `positions` as ps ON ps.id = p.post_id
WHERE p.id IS NULL)
/*
Следующий пример показывает нам как исключить пересечение и получить только левую или правую часть множества.

Левое подмножество LEFT JOIN ограничиваем проверкой, что данных из второй таблицы нет.
*/
SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
LEFT OUTER JOIN `positions` as ps ON ps.id = p.post_id
WHERE ps.id is NULL
/*
В нашем примере — это специалисты, у которых не задана должность или нет должности с указанным ключом.

id 	Имя сотрудника 	pos.id 	Должность 	
3 	Александр 		NULL	NULL

Правое подмножество
Точно также выделяем правую часть.
*/
SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
RIGHT OUTER JOIN `positions` as ps ON ps.id = p.post_id
WHERE p.id is NULL
/*
id 		Имя сотрудника 	pos.id 	Должность 	
NULL	NULL			3 		Программист

В нашем случае получим должности, которые никому не назначены.

Всё кроме пересечения
Остался один вариант, тот когда исключено пересечение множеств. Его можно сложить из двух предыдущих запросов через UNION ALL (т.к. подмножества не пересекаются).
*/
(SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
LEFT OUTER JOIN `positions` as ps ON ps.id = p.post_id
WHERE ps.id is NULL)
UNION ALL
(SELECT p.id, p.name as `Имя сотрудника`, ps.id as `pos.id`, ps.name as `Должность`
FROM `persons` as p
RIGHT OUTER JOIN `positions` as ps ON ps.id = p.post_id
WHERE p.id is NULL)
 
