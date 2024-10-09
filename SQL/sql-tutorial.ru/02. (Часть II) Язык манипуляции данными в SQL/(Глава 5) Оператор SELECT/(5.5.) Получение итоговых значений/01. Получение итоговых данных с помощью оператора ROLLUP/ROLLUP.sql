/*2021.03.16 13:16 IMM*/

/*
 Получение итоговых данных с помощью оператора ROLLUP
	
Посчитаем сумму прихода на каждый из пунктов по таблице Income. Это несложно сделать при помощи запроса
*/

    SELECT point, SUM(inc) Qty 
    FROM Income GROUP BY point;

/*
Пусть наряду с этим нам требуется вывести сумму по всем пунктам, т.е. результат должен выглядеть так:

1    	66500.00
2    	13000.00
3    	3100.00
ALL    	82600.00

Для решения подобной задачи в операторе SELECT имеется спецификация ROLLUP. С её помощью достичь требуемого
 результата не составляет труда:
*/

    SELECT CASE WHEN point IS NULL THEN 'ALL' ELSE CAST(point AS varchar) END point, 
    SUM(inc) Qty
    FROM Income GROUP BY point WITH ROLLUP;

/*
Поскольку значения столбца должны быть одного типа, номер пункта приёма приводится к символьному типу.

Последний запрос можно переписать в иной (стандартной) синтаксической форме:
*/

    SELECT CASE WHEN point IS NULL THEN 'ALL' ELSE CAST(point AS varchar) END point, 
    SUM(inc) Qty
    FROM Income GROUP BY ROLLUP(point);

--Вместо ROLLUP в нашем запросе можно также использовать оператор CUBE:

    SELECT CASE WHEN point IS NULL THEN 'ALL' ELSE CAST(point AS varchar) END point, 
        SUM(inc) Qty
        FROM Income 
        GROUP BY point WITH CUBE;
/*
Подробно о различиях между этими двумя операторами вы можете почитать в статье Бена Ричардсона.

Если СУБД не поддерживает конструкцию ROLLUP, можно использовать либо UNION, либо внешнее соединение (FULL JOIN), 
что позволяет объединить два запроса в один.

Ниже приводятся эти решения.
UNION
*/

    SELECT CAST(point AS varchar) point, SUM(inc) Qty 
    FROM Income GROUP BY point
    UNION ALL
    SELECT 'ALL', SUM(inc)
    FROM Income;
	
-- В Oracle:
    SELECT CAST(point AS varchar(50)) point, SUM(inc) Qty		--varchar requires a size parameter to define the maximum number of characters
    FROM Income GROUP BY point
    UNION ALL
    SELECT 'ALL', SUM(inc)
    FROM Income;	

--FULL JOIN

    SELECT coalesce(X.point,Y.point) point, coalesce(X.Qty,Y.Qty) Qty FROM
    (SELECT CAST(point AS varchar) point, SUM(inc) Qty
    FROM Income GROUP BY point) X
    FULL JOIN
    (SELECT 'ALL' point, SUM(inc) Qty
    FROM Income) Y ON 1 = 2;

/*
В последнем решении следует обратить внимание на то, что соединение выполняется по заведомо ложному предикату,
 т.к. нам нужны строки из обеих таблиц, которые бы не конкатенировались друг с другом.
*/