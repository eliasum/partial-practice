/*2024.09.27 15:03 IMM*/

SELECT * FROM
Product

SELECT * FROM
Laptop

SELECT * FROM
Product
CROSS APPLY
Laptop;

SELECT * FROM
Product
CROSS JOIN
Laptop;

SELECT * FROM
Product, Laptop;

--Для каждого ноутбука дополнительно вывести имя производителя

SELECT p.maker, l.* FROM
Laptop l JOIN Product p ON l.model = p.model

SELECT P.maker, L1.* FROM
Product P
CROSS APPLY
(SELECT * FROM Laptop L WHERE P.model= L.model) L1;		--коррелирующий подзапрос

--Для каждого ноутбука дополнительно вывести максимальную цену среди ноутбуков того же производителя.

--с помощью коррелирующего подзапроса в предложении SELECT
SELECT *, (SELECT MAX(price) FROM Laptop L2
JOIN Product P1 ON L2.model=P1.model
WHERE maker = (SELECT maker FROM Product P2 WHERE P2.model= L1.model)) max_price
FROM Laptop L1;