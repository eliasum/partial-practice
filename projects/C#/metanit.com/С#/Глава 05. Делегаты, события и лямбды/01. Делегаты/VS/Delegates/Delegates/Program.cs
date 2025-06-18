﻿using System;

//Делегаты, события и лямбды
//Делегаты

//Делегаты представляют такие объекты, которые указывают на методы. То есть делегаты - 
//это указатели на методы и с помощью делегатов мы можем вызвать данные методы.

//Определение делегатов

//Для объявления делегата используется ключевое слово delegate, после которого идет 
//возвращаемый тип, название и параметры. Например:

delegate void Message();

//Делегат Message в качестве возвращаемого типа имеет тип void (то есть ничего не 
//возвращает) и не принимает никаких параметров. Это значит, что этот делегат может
//указывать на любой метод, который не принимает никаких параметров и ничего не
//возвращает.

//Рассмотрим примение этого делегата:

//class Program
//{
//    delegate void Message(); // 1. Объявляем делегат

//    static void Main(string[] args)
//    {
//        Message mes; // 2. Создаем переменную делегата

//        if (DateTime.Now.Hour < 12)
//        {
//            mes = GoodMorning; // 3. Присваиваем этой переменной адрес метода
//        }
//        else
//        {
//            mes = GoodEvening;
//        }

//        mes(); // 4. Вызываем метод

//        Console.ReadKey();
//    }
//    private static void GoodMorning()
//    {
//        Console.WriteLine("Good Morning");
//    }
//    private static void GoodEvening()
//    {
//        Console.WriteLine("Good Evening");
//    }
//}

//Здесь сначала мы определяем делегат:

//delegate void Message(); // 1. Объявляем делегат

//В данном случае делегат определяется внутри класса, но также можно определить
//делегат вне класса внутри пространства имен.

//Для использования делегата объявляется переменная этого делегата:

//Message mes; // 2. Создаем переменную делегата

//С помощью свойства DateTime.Now.Hour получаем текущий час. И в зависимости от 
//времени в делегат передается адрес определенного метода. Обратите внимание, 
//что методы эти имеют то же возвращаемое значение и тот же набор параметров
//(в данном случае отсутствие параметров), что и делегат.

//mes = GoodMorning; // 3. Присваиваем этой переменной адрес метода

//Затем через делегат вызываем метод, на который ссылается данный делегат:

//mes(); // 4. Вызываем метод

//Вызов делегата производится подобно вызову метода.

//Посмотрим на примере другого делегата:

//class Program
//{
//    delegate int Operation(int x, int y);

//    static void Main(string[] args)
//    {
//        // присваивание адреса метода через контруктор
//        Operation del = Add; // делегат указывает на метод Add

//        int result = del(4, 5); // фактически Add(4, 5)
//        Console.WriteLine(result);

//        del = Multiply; // теперь делегат указывает на метод Multiply

//        result = del(4, 5); // фактически Multiply(4, 5)
//        Console.WriteLine(result);

//        Console.Read();
//    }
//    private static int Add(int x, int y)
//    {
//        return x + y;
//    }
//    private static int Multiply(int x, int y)
//    {
//        return x * y;
//    }
//}

//В данном случае делегат Operation возвращает значение типа int и имеет два 
//параметра типа int. Поэтому этому делегату соответствует любой метод, который
//возвращает значение типа int и принимает два параметра типа int. В данном 
//случае это методы Add и Multiply.То есть мы можем присвоить переменной 
//делегата любой из этих методов и вызывать.

//Поскольку делегат принимает два параметра типа int, то при его вызове 
//необходимо передать значения для этих параметров: del(4,5).

//Делегаты необязательно могут указывать только на методы, которые определены
//в том же классе, где определена переменная делегата. Это могут быть также
//методы из других классов и структур.

//class Math
//{
//    public int Sum(int x, int y) { return x + y; }
//}
//class Program
//{
//    delegate int Operation(int x, int y);

//    static void Main(string[] args)
//    {
//        Math math = new Math();
//        Operation del = math.Sum;
//        int result = del(4, 5);     // math.Sum(4, 5)
//        Console.WriteLine(result);  // 9

//        Console.Read();
//    }
//}

//Присвоение ссылки на метод

//Выше переменной делегата напрямую присваивался метод. Есть еще один способ -
//создание объекта делегата с помощью конструктора, в который передается
//нужный метод:

//class Program
//{
//    delegate int Operation(int x, int y);

//    static void Main(string[] args)
//    {
//        Operation del = Add;
//        Operation del2 = new Operation(Add);

//        Console.Read();
//    }
//    private static int Add(int x, int y) { return x + y; }
//}

//Оба способа равноценны.

//Соответствие методов делегату

//Как было написано выше, методы соответствуют делегату, если они имеют один
//и тот же возвращаемый тип и один и тот же набор параметров. Но надо учитывать,
//что во внимание также принимаются модификаторы ref и out. Например, пусть
//у нас есть делегат:

delegate void SomeDel(int a, double b);

//Этому делегату соответствует, например, следующий метод:

//void SomeMethod1(int g, double n) { }

//А следующие методы НЕ соответствуют:

//int SomeMethod2(int g, double n) { }
//void SomeMethod3(double n, int g) { }
//void SomeMethod4(ref int g, double n) { }
//void SomeMethod5(out int g, double n) { g = 6; }

//Здесь метод SomeMethod2 имеет другой возвращаемый тип, отличный от типа 
//делегата. SomeMethod3 имеет другой набор параметров. Параметры SomeMethod4
//и SomeMethod5 также отличаются от параметров делегата, поскольку имеют 
//модификаторы ref и out.

//Добавление методов в делегат

//В примерах выше переменная делегата указывала на один метод. В реальности же 
//делегат может указывать на множество методов, которые имеют ту же сигнатуру
//и возвращаемые тип. Все методы в делегате попадают в специальный список -
//список вызова или invocation list. И при вызове делегата все методы из этого
//списка последовательно вызываются. И мы можем добавлять в этот спиок не один,
//а несколько методов:

//class Program
//{
//    delegate void Message();

//    static void Main(string[] args)
//    {
//        Message mes1 = Hello;
//        mes1 += HowAreYou;  // теперь mes1 указывает на два метода
//        mes1(); // вызываются оба метода - Hello и HowAreYou
//        Console.Read();
//    }
//    private static void Hello()
//    {
//        Console.WriteLine("Hello");
//    }
//    private static void HowAreYou()
//    {
//        Console.WriteLine("How are you?");
//    }
//}

//В данном случае в список вызова делегата mes1 добавляются два метода - 
//Hello и HowAreYou. И при вызове mes1 вызываются сразу оба этих метода.

//Для добавления делегатов применяется операция +=. Однако стоит отметить,
//что в реальности будет происходить создание нового объекта делегата, 
//который получит методы старой копии делегата и новый метод, и новый
//созданный объект делеагата будет присвоен переменной mes1.

//При добавлении делегатов следует учитывать, что мы можем добавить ссылку 
//на один и тот же метод несколько раз, и в списке вызова делегата тогда
//будет несколько ссылок на один и то же метод. Соответственно при вызове
//делегата добавленный метод будет вызываться столько раз, сколько он был добавлен:

//Message mes1 = Hello;
//mes1 += HowAreYou;
//mes1 += Hello;
//mes1 += Hello;

//mes1();

//Консольный вывод:

//Hello
//How are you?
//Hello
//Hello

//Подобным образом мы можем удалять методы из делегата с помощью операции -=:

//class Program
//{
//    delegate void Message();

//    static void Main(string[] args)
//    {
//        Message mes1 = Hello;
//        mes1 += HowAreYou;
//        mes1(); // вызываются все методы из mes1
//        mes1 -= HowAreYou;  // удаляем метод HowAreYou
//        mes1(); // вызывается метод Hello

//        Console.Read();
//    }
//    private static void Hello()
//    {
//        Console.WriteLine("Hello");
//    }
//    private static void HowAreYou()
//    {
//        Console.WriteLine("How are you?");
//    }
//}

//При удалении методов из делегата фактически будет создаватья новый делегат, 
//который в списке вызова методов будет содержать на один метод меньше.

//При удалении следует учитывать, что если делегат содержит несколько ссылок
//на один и тот же метод, то операция -= начинает поиск с конца списка вызова 
//делегата и удаляет только первое найденное вхождение. Если подобного метода 
//в списке вызова делегата нет, то операция -= не имеет никакого эффекта.

//Объединение делегатов

//Делегаты можно объединять в другие делегаты. Например:

//class Program
//{
//    delegate void Message();

//    static void Main(string[] args)
//    {
//        Message mes1 = Hello;
//        Message mes2 = HowAreYou;
//        Message mes3 = mes1 + mes2; // объединяем делегаты
//        mes3(); // вызываются все методы из mes1 и mes2

//        Console.Read();
//    }
//    private static void Hello()
//    {
//        Console.WriteLine("Hello");
//    }
//    private static void HowAreYou()
//    {
//        Console.WriteLine("How are you?");
//    }
//}

//В данном случае объект mes3 представляет объединение делегатов mes1 и
//mes2. Объединение делегатов значит, что в список вызова делегата mes3
//попадут все методы из делегатов mes1 и mes2. И при вызове делегата mes3
//все эти методы одновременно будут вызваны.

//Вызов делегата

//В примерах выше делегат вызывался как обычный метод. Если делегат принимал
//параметры, то при его вызове для параметров передавались необходимые значения:

//class Program
//{
//    delegate int Operation(int x, int y);
//    delegate void Message();

//    static void Main(string[] args)
//    {
//        Message mes = Hello;
//        mes();
//        Operation op = Add;
//        op(3, 4);
//        Console.Read();
//    }
//    private static void Hello() { Console.WriteLine("Hello"); }
//    private static int Add(int x, int y) { return x + y; }
//}

//Другой способ вызова делегата представляет метод Invoke() :

//class Program
//{
//    delegate int Operation(int x, int y);
//    delegate void Message();

//    static void Main(string[] args)
//    {
//        Message mes = Hello;
//        mes.Invoke();
//        Operation op = Add;
//        op.Invoke(3, 4);
//        Console.Read();
//    }
//    private static void Hello() { Console.WriteLine("Hello"); }
//    private static int Add(int x, int y) { return x + y; }
//}

//Если делегат принимает параметры, то в метод Invoke передаются значения для 
//этих параметров.

//Следует учитывать, что если делегат пуст, то есть в его списке вызова нет
//ссылок ни на один из методов (то есть делегат равен Null), то при вызове 
//такого делегата мы получим исключение, как, например, в следующем случае:

//Message mes = null;
////mes();        // ! Ошибка: делегат равен null

//Operation op = Add;
//op -= Add;      // делегат op пуст
//op(3, 4);       // !Ошибка: делегат равен null

//Поэтому при вызове делегата всегда лучше проверять, не равен ли он null.
//Либо можно использовать метод Invoke и оператор условного null:

//Message mes = null;
//mes?.Invoke();        // ошибки нет, делегат просто не вызывается

//Operation op = Add;
//op -= Add;          // делегат op пуст
//op?.Invoke(3, 4);   // ошибки нет, делегат просто не вызывается

//Если делегат возвращает некоторое значение, то возвращается значение 
//последнего метода из списка вызова(если в списке вызова несколько методов).
//Например:

//class Program
//{
//    delegate int Operation(int x, int y);

//    static void Main(string[] args)
//    {
//        Operation op = Subtract;
//        op += Multiply;
//        op += Add;
//        Console.WriteLine(op(7, 2));    // Add(7,2) = 9
//        Console.Read();
//    }
//    private static int Add(int x, int y) { return x + y; }
//    private static int Subtract(int x, int y) { return x - y; }
//    private static int Multiply(int x, int y) { return x * y; }
//}

//Делегаты как параметры методов

//Также делегаты могут быть параметрами методов:

//class Program
//{
//    delegate void GetMessage();

//    static void Main(string[] args)
//    {
//        if (DateTime.Now.Hour < 12)
//        {
//            Show_Message(GoodMorning);
//        }
//        else
//        {
//            Show_Message(GoodEvening);
//        }
//        Console.ReadLine();
//    }
//    private static void Show_Message(GetMessage _del)
//    {
//        _del?.Invoke();
//    }
//    private static void GoodMorning()
//    {
//        Console.WriteLine("Good Morning");
//    }
//    private static void GoodEvening()
//    {
//        Console.WriteLine("Good Evening");
//    }
//}

//Обобщенные делегаты

//Делегаты могут быть обобщенными, например:

delegate T Operation<T, K>(K val);

class Program
{
    static void Main(string[] args)
    {
        Operation<decimal, int> op = Square;

        Console.WriteLine(op(5));
        Console.Read();
    }

    static decimal Square(int n)
    {
        return n * n;
    }
}
