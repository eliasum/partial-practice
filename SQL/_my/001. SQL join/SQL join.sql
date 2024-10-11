/*2023.02.28*/
USE [hydra1]

--определение и заполнение таблицы Persons
GO
CREATE TABLE [hydadm].[Persons] (
    [id_person] [int] NOT NULL,
    [name] [nvarchar](50) NULL,
	[position_ref] [int] NULL,
	PRIMARY KEY(id_person)
) ON [PRIMARY]

INSERT INTO [hydadm].Persons
	(id_person,name, position_ref) 
VALUES
	(1,N'Владимир',1),
	(2,N'Татьяна',2),
	(3,N'Александр',6),
	(4,N'Борис',2);

--определение и заполнение таблицы Positions
CREATE TABLE [hydadm].[Positions] (
    [id_pos] [int] NOT NULL,
    [title] [nvarchar](50) NULL,
	PRIMARY KEY(id_pos)
) ON [PRIMARY]

INSERT INTO [hydadm].Positions
	(id_pos,title) 
VALUES
	(1,N'Дизайнер'),
	(2,N'Редактор'),
	(3,N'Программист');
	
--INNER JOIN
SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
INNER JOIN [hydadm].Positions ON id_pos = position_ref	

--OUTER JOIN

--LEFT OUTER JOIN
SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
LEFT OUTER JOIN [hydadm].Positions ON id_pos = position_ref

--RIGHT OUTER JOIN
SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
RIGHT OUTER JOIN [hydadm].Positions ON id_pos = position_ref

--FULL OUTER JOIN
SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
FULL OUTER JOIN [hydadm].Positions ON id_pos = position_ref
--или
SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
LEFT OUTER JOIN [hydadm].Positions ON id_pos = position_ref

UNION

SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
RIGHT OUTER JOIN [hydadm].Positions ON id_pos = position_ref
--или
SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
LEFT OUTER JOIN [hydadm].Positions ON id_pos = position_ref

UNION ALL

SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
RIGHT OUTER JOIN [hydadm].Positions ON id_pos = position_ref
WHERE id_person is NULL

--Всё кроме пересечения
SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
LEFT OUTER JOIN [hydadm].Positions ON id_pos = position_ref
WHERE id_pos is NULL

UNION ALL

SELECT id_person, name, id_pos, title
FROM [hydadm].Persons
RIGHT OUTER JOIN [hydadm].Positions ON id_pos = position_ref
WHERE id_person is NULL