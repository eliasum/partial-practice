/*2024.09.27 15:55 IMM*/

--“ребуетс€ определить дату и –≈…—џ каждого пассажира, совершенные им в свой последний полетный день.

SELECT * FROM Pass_in_trip ORDER BY ID_psg

SELECT ID_psg, MAX(date)
FROM Pass_in_trip
GROUP BY ID_psg;

--Column 'Pass_in_trip.trip_no' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause.
SELECT ID_psg, trip_no, MAX(date)
FROM Pass_in_trip
GROUP BY ID_psg;

--последний полет (MAX(date)) пассажира каждым рейсом, которым он летал. Ёто совсем не та задача, которую мы пытаемс€ решить
SELECT ID_psg, trip_no, MAX(date)
FROM Pass_in_trip
GROUP BY ID_psg, trip_no;

--ѕрименение коррелирующего подзапроса дает то, что нужно
SELECT ID_psg, trip_no, [date]
FROM Pass_in_trip pt_1
WHERE [date] = (SELECT MAX([date])
FROM Pass_in_trip pt_2
WHERE pt_1.ID_psg = pt_2.ID_psg
);

/*2024.10.03 15:49 IMM*/

--ќчевидным недостатком приведенного решени€ как раз и €вл€етс€ то, что подзапрос должен вычисл€тьс€ дл€ каждой строки
--основного запроса. „тобы избежать этого, можно предложить альтернативное решение, использующее соединение таблицы
--Pass_in_trip с приведенным в самом начале подзапросом, который вычисл€ет максимальные даты по каждому пассажиру

SELECT pt_1.ID_psg, trip_no, [date]
FROM Pass_in_trip pt_1 JOIN
(SELECT ID_psg, MAX([date]) md
FROM Pass_in_trip
GROUP BY ID_psg
) pt_2 ON pt_1.ID_psg = pt_2.ID_psg AND
[date] = md;