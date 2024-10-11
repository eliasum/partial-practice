/*2024.09.27 15:55 IMM*/

--��������� ���������� ���� � ����� ������� ���������, ����������� �� � ���� ��������� �������� ����.

SELECT * FROM Pass_in_trip ORDER BY ID_psg

SELECT ID_psg, MAX(date)
FROM Pass_in_trip
GROUP BY ID_psg;

--Column 'Pass_in_trip.trip_no' is invalid in the select list because it is not contained in either an aggregate function or the GROUP BY clause.
SELECT ID_psg, trip_no, MAX(date)
FROM Pass_in_trip
GROUP BY ID_psg;

--��������� ����� (MAX(date)) ��������� ������ ������, ������� �� �����. ��� ������ �� �� ������, ������� �� �������� ������
SELECT ID_psg, trip_no, MAX(date)
FROM Pass_in_trip
GROUP BY ID_psg, trip_no;

--���������� �������������� ���������� ���� ��, ��� �����
SELECT ID_psg, trip_no, [date]
FROM Pass_in_trip pt_1
WHERE [date] = (SELECT MAX([date])
FROM Pass_in_trip pt_2
WHERE pt_1.ID_psg = pt_2.ID_psg
);

/*2024.10.03 15:49 IMM*/

--��������� ����������� ������������ ������� ��� ��� � �������� ��, ��� ��������� ������ ����������� ��� ������ ������
--��������� �������. ����� �������� �����, ����� ���������� �������������� �������, ������������ ���������� �������
--Pass_in_trip � ����������� � ����� ������ �����������, ������� ��������� ������������ ���� �� ������� ���������

SELECT pt_1.ID_psg, trip_no, [date]
FROM Pass_in_trip pt_1 JOIN
(SELECT ID_psg, MAX([date]) md
FROM Pass_in_trip
GROUP BY ID_psg
) pt_2 ON pt_1.ID_psg = pt_2.ID_psg AND
[date] = md;