using System;
using System.Threading;

/*
Потоки с параметрами и ParameterizedThreadStart

В предыдущем примере мы рассмотрели, как запускать в отдельных потоках методы без
параметров. А что, если нам надо передать какие-нибудь параметры в поток?

Для этой цели используется делегат ParameterizedThreadStart. Его действие похоже на
функциональность делегата ThreadStart. Рассмотрим на примере:
*/

class Program
{
    static void Main(string[] args)
    {
        int number = 4;

        //Делегат - это обьект указывающий на метод.
        //Здесь происходит передача метода Count() новому объекту myThread типа Thread
        //через новый экземпляр делегата ParameterizedThreadStart (сообщаем метод
        //Count() с делегатом типа ParameterizedThreadStart). При создании
        //нового потока будет выполняться код из метода Count().
        //Т.е. метод, код которого должен выполняться в другом потоке, передается в 
        //качестве аргумента экземпляру делегата ParameterizedThreadStart, который
        //в свою очередь передается в качестве аргумента экземпляру класса Thread:
        //метод --> экземпляр делегата ParameterizedThreadStart --> объект Thread

        // создаем новый поток
        Thread myThread = new Thread(new ParameterizedThreadStart(Count));

        // запускаем новый поток
        myThread.Start(number);

        // основной поток
        for (int i = 1; i < 9; i++)
        {
            Console.WriteLine("Главный поток:");
            Console.WriteLine(i * i);
            Thread.Sleep(300);
        }

        Console.ReadLine();
    }

    public static void Count(object x)
    {
        for (int i = 1; i < 9; i++)
        {
            int n = (int)x;

            Console.WriteLine("Второй поток:");
            Console.WriteLine(i * n);
            Thread.Sleep(400);
        }
    }
}

/*
После создания потока мы передаем в метод myThread.Start(number); переменную, значение
которой хотим передать в поток.

При использовании ParameterizedThreadStart мы сталкиваемся с ограничением: мы можем
запускать во втором потоке только такой метод, который в качестве единственного 
параметра принимает объект типа object. Поэтому в данном случае нам надо дополнительно
привести переданное значение к типу int, чтобы его использовать в вычислениях.
*/
