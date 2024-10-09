/*2021.04.06 13:46 IMM*/

/*
 	
Новое в стандарте и реализациях языка SQL
Общие табличные выражения (CTE)
Рекурсивные СТЕ
	
У CTE есть еще одно важное назначение. С его помощью можно написать рекурсивный запрос, т.е. запрос,
 который, написанный один раз, будет повторяться многократно пока истинно некоторое условие.

Рекурсивный CTE имеет следующий вид:
*/
    WITH <имя>[(<список столбцов>)]
    AS(
    < SELECT... > -- анкорная часть
    UNION ALL -- рекурсивная часть
    < SELECT...FROM <имя>… > 
    WHERE <условие продолжения итераций>
    )

/*	
От обычного CTE-запроса рекурсивный отличается только рекурсивной частью, которая вводится предложением
 UNION ALL. Обратите внимание, что в рекурсивной части присутствует ссылка на имя CTE, т.е. внутри CTE
 ссылается само на себя. Это, собственно, и есть рекурсия. Естественно, анкорная и рекурсивная части 
 должны иметь одинаковый набор столбцов.

В MySQL рекурсивные CTE (как и обычные) появились в версии 8. Их синтаксис фактически отличается от 
синтаксиса SQL Server только одним словом RECURSIVE:
*/

    WITH RECURSIVE <имя>[(<список столбцов>)]
    AS(... и так далее

/*	
Перейдем к примеру. Рассмотрим задачу получения алфавита, т.е. таблицы алфавитных символов - прописных
 латинских букв. Чтобы было с чем сравнивать, решим сначала эту задачу с помощью генерации числовой
 последовательности, которая рассматривалась в параграфе 8.1.
*/

    SELECT CHAR(ASCII('A')+5*(a-1) + b-1) AS num 
    FROM (SELECT 1 a UNION ALL SELECT 2 UNION ALL SELECT 3 
    UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
    ) x CROSS JOIN
     (SELECT 1 b UNION ALL SELECT 2 UNION ALL SELECT 3 
    UNION ALL SELECT 4 UNION ALL SELECT 5 
    ) y 
    WHERE 5*(a-1) + b <= 26
    ORDER BY 1;

--А вот решение с помощью рекурсивного CTE

    ;WITH Letters AS(
    SELECT ASCII('A') code, CHAR(ASCII('A')) letter
    UNION ALL
    SELECT code+1, CHAR(code+1) FROM Letters
    WHERE code+1 <= ASCII('Z')
    )
    SELECT letter FROM Letters;

/*	
В запросе анкорной части определяем ASCII-код первой буквы алфавита и соответствующий ему символ. 
В запросе рекурсивной части мы просто увеличиваем ASCII-код на единицу, обращаясь к CTE в предложении
 FROM. В результате к строке с первым символом будут последовательно добавляться (UNION ALL) строки со 
 следующими буквами в порядке их ASCII-кодов. Итерации будут продолжаться до тех пор, пока условие 
 code +1 <= ascii('Z') будет истинным, т.е. пока не будет добавлена буква "Z".

Оператор

    SELECT letter FROM Letters

собственно и служит для обращения к CTE, запуска рекурсии и вывода результата. Все остальное можно считать определением.

Следует заметить, что по умолчанию допускается 100 итераций. Это значит, что если условие прекращения итераций не выполнено ранее, то рекурсия будет остановлена после выполнения 100 итераций. Максимальное число итераций можно изменить с помощью «хинта»

    OPTION(MAXRECURSION N)

где N – максимальное число итераций. Значение 0 не ограничивает число итераций. Нужно с осторожностью использовать это значение, т.к. оно чревато зацикливанием.

Если запрос не был завершен в пределах указанного числа итераций, возникает ошибка (полученные к этому моменту строки возвращаются):

The statement terminated. The maximum recursion N has been exhausted before statement completion.  (Выполнение оператора прервано. Достигнут предел максимального числа итераций N до завершения выполнения оператора).

В MySQL наша задача будет иметь аналогичное решение:

    WITH RECURSIVE Letters AS(
        SELECT ASCII('A') code, CHAR(ASCII('A')) letter
        UNION ALL
        SELECT code+1, CHAR(code+1) FROM Letters
        WHERE code+1 <= ASCII('Z')
        )
        SELECT letter FROM Letters;


Давайте решим еще одну задачу в качестве ответа на вопрос, который мне неоднократно встречался на просторах Интернет.
Bookmark and Share

 Рекурсивные СТЕ стр. 2
	
	

Преобразовать текст в столбце таблицы таким образом, чтобы каждое слово начиналось с заглавной буквы.

Вот пример данных и требуемый результат:
delta     	Delta       
KSI PSI     	Ksi Psi       
alfa beta gamma    zeta    	Alfa Beta Gamma    Zeta       
ALfa and omegA     	Alfa And Omega    

За небольшим числом исключений (среди которых можно упомянуть аббревиатуры и инициалы) можно считать, что слову внутри текста предшествует пробел. Это можно использовать в качестве критерия поиска нужных нам элементов текста. Предлагаю реализовать такой достаточно примитивный алгоритм:

1. Первую букву текста делаем прописной, а остальные - строчными.

2. Затем каждую конструкцию "пробел+буква" переводим в верхний регистр.

С первым пунктом алгоритма все просто:
Консоль
Выполнить Скопировать Ctrl-C

    SELECT name, UPPER(LEFT(name, 1)) + LOWER(SUBSTRING(name, 2, LEN(name) - 1)) rep
    FROM
    (SELECT 'ALfa and omegA' AS name
    UNION ALL SELECT 'alfa beta gamma    zeta'
    UNION ALL SELECT 'KSI PSI'
    UNION ALL SELECT 'delta'
    ) X;

ALfa and omegA     	Alfa and omega       
alfa beta gamma zeta   	Alfa beta gamma    zeta       
KSI PSI     	Ksi psi       
delta     	Delta    

Для реализации второго пункта есть варианты. Поскольку букв латинского алфавита не так много (26), можно просто сделать 26 замен. Я не поленюсь и приведу полный вариант, чтобы вы могли поэкспериментировать с запросом.

Итак,

Консоль
Выполнить Скопировать Ctrl-C

    SELECT name, REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    REPLACE(REPLACE(rep, ' a', ' A'), ' b', ' B'), ' c', ' C'), ' d', ' D'),
     ' e', ' E'), ' f', ' F'), ' g', ' G'), ' h', ' H'), ' i', ' I'), ' j', ' J'), ' k', ' K'), 
    ' l', ' L'), ' m', ' M'),  ' n',' N'), ' o', ' O'), ' p', ' P'), ' q', ' Q'), ' r', ' R'),
     ' s', ' S'), ' t', ' T'), ' u', ' U'), ' v', ' V'),
     ' w', ' W'), ' x', ' X'), ' y', ' Y'), ' z', ' Z')
    FROM(
    SELECT name, UPPER(LEFT(name,1)) + LOWER(SUBSTRING(name, 2, LEN(name)-1)) rep
    FROM
    (SELECT 'ALfa and omegA' AS name
    UNION ALL SELECT 'alfa beta gamma    zeta'
    UNION ALL SELECT 'KSI PSI'
    UNION ALL SELECT 'delta'
    ) X
    ) Y;

Нетрудно догадаться, что следующий вариант будет использовать рекурсивный CTE.
Bookmark and Share

 Рекурсивные СТЕ стр. 3
	
	

Сначала напишем два простых CTE, которые формируют наш тестовый пример и определяют ASCII-код первой буквы алфавита (A) - не писать же константу. :-) Далее последует анкорная часть, которая выполняет ранее описанную операцию приведения всего текста к нижнему регистру с заглавной первой буквой. Здесь же выполним замену символа с кодом code и предшествующим ему пробелом на... него же. Пусть вас не смущает такая, казалось бы, бесполезная замена. Дело в том, что для регистронезависимых баз данных символы 'a' и 'A' не различаются. Давайте пока на этом остановимся и посмотрим результат.

Консоль
Выполнить Скопировать Ctrl-C

    WITH NM(name) AS
    (SELECT 'ALfa and omegA' AS name
    UNION ALL SELECT 'alfa beta gamma    zeta'
    UNION ALL SELECT 'KSI PSI'
    UNION ALL SELECT 'delta'
    ),
    Ascii_code AS(
    SELECT  ASCII('A') AS code
    ),
    Repl(name, code, rep) AS
    (SELECT name, code, REPLACE(UPPER(LEFT(name, 1)) + 
    LOWER(SUBSTRING(name, 2, LEN(name) - 1)),' '+CHAR(code),' '+CHAR(code)) rep 
    FROM Ascii_code, NM
    ) 
    SELECT name, rep FROM Repl;

 
ALfa and omegA     	Alfa And omega       
alfa beta gamma zeta 	Alfa beta gamma    zeta       
KSI PSI     	Ksi psi       
delta     	Delta    

Добавим, наконец, рекурсивную часть, в которой мы выполним замену буквы с кодом code+1. Рекурсия будет продолжаться до тех пор, пока не будет нарушено условие code < ASCII('Z'), т.е. пока мы не переберем все буквы.

Что же мы получим на выходе? К строкам, которые были получены в результате выполнения анкорной части, на каждой итерации будут добавлены (UNION ALL) те же строки с заменой очередной буквы. Отметим большой объем результата при использовании данного метода; в нашем случае это 4х26 = 104 строки. Из этого множества строк нас интересуют только те, которые получены в результате последней итерации, т.е. когда были выполнены все замены. Этой последней итерации соответствует условие code = ASCII('Z'), которое и используется в финальном запросе:

Консоль
Выполнить Скопировать Ctrl-C

    WITH NM(name) AS
    (SELECT 'ALfa and omegA' AS name
    UNION ALL SELECT 'alfa beta gamma    zeta'
    UNION ALL SELECT 'KSI PSI'
    UNION ALL SELECT 'delta'
    ),
    Ascii_code AS(
    SELECT  ASCII('A') AS code
    ),
    Repl(name, code, rep) AS
    (SELECT name, code, REPLACE(UPPER(LEFT(name, 1)) + 
    LOWER(SUBSTRING(name, 2, LEN(name) - 1)),' '+CHAR(code),' '+CHAR(code)) rep 
    FROM Ascii_code, NM
    UNION ALL
    SELECT name, code+1 code, REPLACE(rep,' ' + CHAR(code+1), ' ' + char(code + 1)) rep
     FROM Repl
    WHERE code < ASCII('Z')
    )
    SELECT name, rep FROM Repl WHERE code=ASCII('Z');

Я хотел бы предостеречь вас от чрезмерного увлечения рекурсивными CTE, поскольку они зачастую проигрывают в производительности "традиционным" методам. Я не буду далеко ходить за примерами и сравню два представленных здесь метода. Увеличив количество обрабатываемых строк до 10000, я получил такое время использования CPU:

метод на основе REPLACE: 842 ms

рекурсивный метод: 6615 ms

Безусловно, есть задачи, которые нельзя решить непроцедурно в рамках стандарта SQL-92. В этих случаях использование рекурсивных CTE вполне обоснованно. В остальных случаях я бы рекомендовал выполнять тесты производительности для альтернативных решений.

Кстати, в Oracle и PostgreSQL есть встроенная функция INITCAP, которая решает данную задачу:

    SELECT INITCAP(name) 
      FROM
       (SELECT 'ALfa and omegA' AS name
         UNION ALL SELECT 'alfa beta gamma    zeta'
         UNION ALL SELECT 'KSI PSI'
         UNION ALL SELECT 'delta'
     ) X;

Вы можете использовать консоль, чтобы убедиться в этом.
*/