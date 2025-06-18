SELECT DISTINCT maker FROM Product AS LaptopProduct WHERE type = 'Laptop' AND
EXISTS(SELECT maker FROM Product WHERE type = 'Printer' AND maker = LaptopProduct.maker)

SELECT DISTINCT maker FROM Product AS LaptopMakers WHERE type = 'Laptop' 
INTERSECT
SELECT maker FROM Product WHERE type = 'Printer'

SELECT DISTINCT maker FROM Product AS LaptopProduct WHERE type = 'Laptop' AND
NOT EXISTS(SELECT maker FROM Product WHERE type = 'Printer' AND maker = LaptopProduct.maker)

SELECT DISTINCT maker FROM Product AS LaptopMakers WHERE type = 'Laptop' 
EXCEPT
SELECT maker FROM Product WHERE type = 'Printer'