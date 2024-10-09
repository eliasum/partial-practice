/*2021.03.12 16:48 IMM*/

SELECT * from Outcomes;
/*
	 ship				battle			result
01	 Bismarck			North Atlantic	sunk
02	 California			Guadalcanal		damaged
03	 California			Surigao Strait	OK
04	 Duke of York		North Cape		OK
05	 Fuso				Surigao Strait	sunk
06	 Hood				North Atlantic	sunk
07	 King George V		North Atlantic	OK
08	 Kirishima			Guadalcanal		sunk
09	 Prince of Wales	North Atlantic	damaged
10	 Rodney				North Atlantic	OK
11	 Schamhorst			North Cape		sunk
12	 South Dakota		Guadalcanal		damaged
13	 Tennessee			Surigao Strait	OK
14	 Washington			Guadalcanal		OK
15	 West Virginia		Surigao Strait	OK
16	 Yamashiro			Surigao Strait	sunk
*/

SELECT * from Ships;
/*
	name			class			launched
01	California		Tennessee		1921
02	Haruna			Kongo			1916
03	Hiei			Kongo			1914
04	Iowa			Iowa			1943
05	Kirishima		Kongo			1915
06	Kongo			Kongo			1913
07	Missouri		Iowa			1944
08	Musashi			Yamato			1942
09	New Jersey		Iowa			1943
10	North Carolina	North Carolina	1941
11	Ramillies		Revenge			1917
12	Renown			Renown			1916
13	Repulse			Renown			1916
14	Resolution		Renown			1916
15	Revenge			Revenge			1916
16	Royal Oak		Revenge			1916
17	Royal Sovereign	Revenge			1916
18	South Dakota	North Carolina	1941
19	Tennessee		Tennessee		1920
20	Washington		North Carolina	1941
21	Wisconsin		Iowa			1944
22	Yamato			Yamato			1941
*/

SELECT ship, launched 
FROM (Outcomes AS o LEFT JOIN Ships AS s ON o.ship = s.name);
/*
	ship			launched
01	Bismarck		NULL
02	California		1921
03	California		1921
04	Duke of York	NULL
05	Fuso			NULL
06	Hood			NULL
07	King George V	NULL
08	Kirishima		1915
09	Prince of Wales	NULL
10	Rodney			NULL
11	Schamhorst		NULL
12	South Dakota	1941
13	Tennessee		1920
14	Washington		1941
15	West Virginia	NULL
16	Yamashiro		NULL
*/

SELECT ship, launched 
FROM (Outcomes AS o RIGHT JOIN Ships AS s ON o.ship = s.name);
/*
	ship			launched
01	California		1921
02	California		1921
03	NULL			1916
04	NULL			1914
05	NULL			1943
06	Kirishima		1915
07	NULL			1913
08	NULL			1944
09	NULL			1942
10	NULL			1943
11	NULL			1941
12	NULL			1917
13	NULL			1916
14	NULL			1916
15	NULL			1916
16	NULL			1916
17	NULL			1916
18	NULL			1916
19	South Dakota	1941
20	Tennessee		1920
21	Washington		1941
22	NULL			1944
23	NULL			1941
*/