using System;
using System.Threading;

/*
Но что делать, если нам надо передать не один, а несколько параметров различного
типа? В этом случае на помощь приходит классовый подход:
*/

class Program
{
    static void Main(string[] args)
    {
        Counter counter = new Counter();
        counter.x = 4;
        counter.y = 5;

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
        myThread.Start(counter);

        // основной поток
        //...................

        Console.ReadLine();
    }

    public static void Count(object obj)
    {
        for (int i = 1; i < 9; i++)
        {
            Counter c = (Counter)obj;

            Console.WriteLine("Второй поток:");
            Console.WriteLine(i * c.x * c.y);
        }
    }
}

public class Counter
{
    public int x;
    public int y;
}

/*
Сначала определяем специальный класс Counter, объект которого будет передаваться во
второй поток, а в методе Main передаем его во второй поток.
*/
